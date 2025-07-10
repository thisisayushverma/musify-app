import { cloudinaryUpload } from "./cloudinary.js"


const imageUploader = async (file)=>{
    try {
        const image_url = await cloudinaryUpload(file);
        return image_url;
    } catch (error) {
        throw error
    }
}


export {
    imageUploader
}