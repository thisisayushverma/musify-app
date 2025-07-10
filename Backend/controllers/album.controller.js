import Album from "../schema/album.schema";
import asyncHandler from "../utils/asyncHandle";
import { cloudinaryUpload } from "../utils/cloudinary";


const createAlbum = asyncHandler(async (req, res) => {
    const {albumName,releaseDate,userId} = req.body
    const {imageFile} = req.files

    const imageUpload = await cloudinaryUpload(imageFile)
    if(imageUpload === null){
        const error = new Error("Image upload failed,try again");
        error.status = 500;
        throw error;
    }

    const album = new Album({
        title:albumName,
        artist:userId,
        image:imageUpload,
        releaseDate:releaseDate
    })

    const savedAlbum = await album.save();
    if(savedAlbum){
        return res.status(200).json(apiResponse(200, true, "Album created successfully", savedAlbum));
    }
    else{
        const error = new Error("Album creation failed,try again");
        error.status = 500;
        throw error;
    }
})

const getAlbum = asyncHandler(async (req, res) => {
    
})

const deleteAlbum = asyncHandler(async (req, res) => {
    const {albumId} = req.params;
    const deletedAlbum = await Album.findByIdAndDelete(albumId); 
    if(deletedAlbum){
        return res.status(200).json(apiResponse(200, true, "Album deleted successfully", deletedAlbum));
    }
    else{
        const error = new Error("Album deletion failed,try again");
        error.status = 500;
        throw error;
    }
})


const getAllAlbum = asyncHandler(async (req, res,next) => {
    const {userId} = req.params;
    const albums = await Album.find({artist:userId});
    if(albums){
        console.log("get all album by userId",albums);
        return res.status(200).json(apiResponse(200, true, "Albums fetched successfully", albums));
    }
    else{
        const error = new Error("Albums fetching failed,try again");
        error.status = 500;
        throw error;
    }
})

const getAllAlbumById = asyncHandler(async(req,res,next) => {
    const {albumId} = req.params;
    const album = await Album.findById(albumId);
    if(album){
        console.log("get ablum by id ");
        return res.status(200).json(apiResponse(200, true, "Album fetched successfully", album));
    }
    else{
        const error = new Error("Album fetching failed,try again");
        error.status = 500;
        throw error;
    }
})



export{
    getAlbum,
    getAllAlbum,
    createAlbum,
    deleteAlbum,
    getAllAlbumById
}

