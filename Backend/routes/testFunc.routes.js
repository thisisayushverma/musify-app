import { Router } from "express";
import { deleteFileFromS3, getAllFileAndFolderFromBucket, uploadAudioFile } from "../utils/awsS3Bucket.js";
import { readAllFileInsideFolderAndUploadToS3 } from "../utils/operationOnFile.js";
import { cloudinaryUpload } from "../utils/cloudinary.js";
import { upload } from "../utils/multer.js";

const router = Router();

router.get('/get-all-object', async (req, res) => {
    const result =await getAllFileAndFolderFromBucket("d3e079b3-68ad-424d-a2c0-3cd5dbf3013b");
    console.log("func call",result);
    if(result.KeyCount>0){
        const arr = result.Contents.map((item) => item.Key);
    
        arr.map(async (item) => {
            await deleteFileFromS3(item);
        });
    }
    else{
        console.log("no file found");
    }
    
    res.send(result)
})

router.get('/upload',async(req,res)=>{
    await readAllFileInsideFolderAndUploadToS3("public/adaptiveStreamAudioFiles/c5fda562-bf61-4a72-b6b2-58a8bd23a9bd")

    console.log("file uploaded");
    res.send("file uploaded")
})

router.post('/upload-image',upload.single("thumbnail"),async (req,res)=>{
    const {file} = req;
    console.log(file);
    const result = await cloudinaryUpload(file.path)
    console.log(result);
    res.send(result)
})

export default router