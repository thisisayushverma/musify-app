import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


const cloudinaryUpload = async (file) => {
    const img_url = await cloudinary.uploader.upload(file)
    .then(result =>{
        console.log("file uploaded to cloudinary res from cloudinary",result);
        return result.url;
    })
    .catch(err => console.log(err));
    return img_url;
}


export { cloudinaryUpload }

