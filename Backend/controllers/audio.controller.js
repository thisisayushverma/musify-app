import asyncHandler from "../utils/asyncHandle.js";
import { convertIntoWav } from "../utils/convertAudioIntoWav.js";
import apiResponse from "../utils/apiResponse.js";
import { cloudinaryUpload } from "../utils/cloudinary.js";
import Audio from "../schema/audio.schema.js";

import wavQueue from "../queue/wavconverter.queue.js"

const createAudioFile = asyncHandler(async (req, res) => {
    const {title,genre,tags,audioUuId} = req.body;
    // console.log(req);
    const duration = JSON.parse(req.body.duration);
    const isPublic = JSON.parse(req.body.isPublic);
    const {file} = req
    console.log(title,duration,genre,isPublic,tags,audioUuId);
    if(!title || !duration || !genre || isPublic===undefined || !tags || !audioUuId || !file){
        const error = new Error("Please add all fields");
        error.status=400;
        throw error;
    }

    const stringifiedGenre = JSON.stringify(genre); 
    const stringifiedTags = JSON.stringify(tags); 

    console.log(stringifiedGenre,stringifiedTags);

    const image_url = await cloudinaryUpload(file.path);
    // console.log(req.user);
    // console.log(image_url);
    const audio = await Audio.create({
        artist:req.user._id,
        title,
        duration,
        genre:stringifiedGenre,
        isPublic,
        tags,
        audioUuId,
        image_url
    })

    if(audio){
        return res.status(200).json(apiResponse(200, true, "Audio created successfully", audio));
    }
    else{
        const error = new Error("Audio creation failed,try again");
        error.status = 500;
        throw error;
    }
})


const uploadAudioFile = asyncHandler(async (req, res) => {
    const { file } = req;
    console.log(file);
    if(!file){
        const error = new Error("Please add audio file");
        error.status=400;
        throw error;
    }

    res.status(200).json(apiResponse(200, true, "Audio Uploaded Successfully", file))
    
    // convertIntoWav(file.destination + "/" + file.filename);

    wavQueue.add("wavConverter",{
        audioFileDestiname:file.destination, audioFileName:file.filename
    })
})





const deleteAudioFile = asyncHandler(async (req, res) => {
    // const audioId = req.params.id;
    
    // delete from schema

    // delete from cloudinary

    // delete from s3 Bucket
    
})

const getAllAudio = asyncHandler(async (req, res) => {
    const {userId} = req.params;
    const allAudio = await Audio.find({artist:userId}).sort({createdAt:-1});

    if(allAudio){
        console.log("get all audio by userId",allAudio);
        return res.status(200).json(apiResponse(200, true, "Audio fetched successfully", allAudio));
    }
    else{
        const error = new Error("Audio fetching failed,try again");
        error.status = 500;
        throw error;
    }
})

const getAllMyAudio = asyncHandler(async(req,res)=>{
    const user = req.user;
    const allMyAudio = await Audio.find({artist:user._id}).sort({createdAt:-1});

    if(allMyAudio){
        res.status(201).json(apiResponse(201,true,"all your audio found",allMyAudio))
    }
    else{
        const error = new Error("Audio fetching failed,try again");
        error.status = 500;
        throw error;
    }
})

const getFeaturedSong = asyncHandler(async (req, res) => {
    const getFeaturedSong = await Audio.aggregate([
        {
            $sample:{size:6}
        },
        {
            $project:{
                _id:1,
                title:1,
                artist:1,
                imageUrl:1,
                audioUrl:1
            }
        }
    ])

    if(getFeaturedSong){
        console.log("get all audio by userId",getFeaturedSong);
        return res.status(200).json(apiResponse(200, true, "Audio fetched successfully", getFeaturedSong));
    }
    else{
        const error = new Error("Audio fetching failed,try again");
        error.status = 500;
        throw error;
    }

})

const getMadeForYou = asyncHandler(async (req, res) => {
    const getFeaturedSong = await Audio.aggregate([
        {
            $sample:{size:4}
        },
        {
            $project:{
                _id:1,
                title:1,
                artist:1,
                imageUrl:1,
                audioUrl:1
            }
        }
    ])

    if(getFeaturedSong){
        console.log("get all audio by userId",getFeaturedSong);
        return res.status(200).json(apiResponse(200, true, "Audio fetched successfully", getFeaturedSong));
    }
    else{
        const error = new Error("Audio fetching failed,try again");
        error.status = 500;
        throw error;
    }
})

export {
    createAudioFile,
    uploadAudioFile,
    deleteAudioFile,
    getAllMyAudio,
}