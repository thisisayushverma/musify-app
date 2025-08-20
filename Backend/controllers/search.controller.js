import apiResponse from "../utils/apiResponse.js"
import asyncHandler from "../utils/asyncHandle.js";
import Audio from "../schema/audio.schema.js";


const searchSong = async(searchInp)=>{
    try {
        const searchResult = await Audio.aggregate([
            {
                $search:{
                    "index":"default",
                    "text":{
                        "query":searchInp,
                        "path":["title","tags","genre"],
                        "fuzzy":{
                            "maxEdits":2,
                            "prefixLength":1
                        }
                    }
                }
            },
            {
                $match:{
                    isPublic:true
                }
            },
            {
                $lookup:{
                    from:"users",
                    localField:"artist",
                    foreignField:"_id",
                    as:"artist"
                }
            },
            {
                $unwind:"$artist"
            },
            {
                $project:{
                    _id:1,
                    title:1,
                    artist:"$artist.name",
                    image_url:1,
                    duration:1,
                    audioUuId:1,
                    score:{
                        $meta:"searchScore"
                    }
                }
            },
            
            {
                $sort:{
                    score:-1
                }
            },{
                $limit:10
            }
        ])
        return searchResult;
    } catch (error) {
        throw error
    }
}

const handleSearch = asyncHandler(async (req, res) => {
    const { search } = req.params;
    console.log(search);
    const searchResult = await searchSong(search);
    console.log(searchResult); 
    return res.status(200).json(apiResponse(200,true,"data fetch",searchResult));
});


const handleSearchSong = asyncHandler(async(req,res)=>{
    console.log(req.body);
    const {search} = req.body;
    const searchResult = await searchSong(search);
    return res.status(200).json(apiResponse(200,true,"data fetch",searchResult));
})

export { 
    handleSearch,
    handleSearchSong
};