import Playlist from "../schema/playlist.schema.js";
import { cloudinaryUpload } from "../utils/cloudinary.js";
import asyncHandler from "../utils/asyncHandle.js";
import apiResponse from "../utils/apiResponse.js";


const handleCreatePlaylist = asyncHandler(async (req, res, next) => {
    const {
        title,
        description,
        isPublic,
        listOfSongs
    }= req.body
    const {file} = req
    const {user} = req

    if(!title || !description || !isPublic || !user){
        const error = new Error("Please add all fields");
        error.status=400;
        throw error;
    }
    
    const image_url = file? await cloudinaryUpload(file.path):null;

    if(!image_url){
        const error = new Error("Image upload failed,try again");
        error.status = 500;
        throw error;
    }

    const parsedAudioList = JSON.parse(listOfSongs);


    console.log(parsedAudioList);


    const playlist = await Playlist({
        title,
        description,
        image_url,
        isPublic,
        create_by:user._id,
        songs:parsedAudioList
    })

    await playlist.save();
    res.status(201).json(apiResponse(201,true,"Playlist created successfully",playlist))
})



export {
    handleCreatePlaylist
}