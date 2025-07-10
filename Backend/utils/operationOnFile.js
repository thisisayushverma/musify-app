import fs from "fs";
import { uploadAudioFile } from "./awsS3Bucket.js";


const readAllFileInsideFolderAndUploadToS3 =async (filePath)=>{
    // console.log(filePath);
    const readDir = fs.readdirSync(filePath,{withFileTypes: true});
    for(const file of readDir){
        if(file.isDirectory()){
            await readAllFileInsideFolderAndUploadToS3(`${filePath}/${file.name}`);
        }
        else{
            // console.log("end file path",filePath,file.name);

            // console.log("AWS_REGION: in fs func", process.env.AWS_BUCKET_REGION);
            await uploadAudioFile(`${filePath}/${file.name}`)
            .then((res)=>{
                console.log(`${filePath}/${file.name}`,"file uploaded successfully",res.$metadata.httpStatusCode);
                // fs.unlinkSync(`${filePath}/${file.name}`);
            })
            .catch(err=>{
                console.log(err);
            })
        }   
    }
}


const deleteFileFromFolder =(folderPath)=>{
    // const readDir = fs.readdirSync(filePath,{withFileTypes: true});
    // console.log("readDir",readDir);
    // for(const file of readDir){
    //     if(file.isDirectory()){
    //         deleteFileFromFolder(`${filePath}/${file.name}`);
    //     }
    //     else{
    //         fs.unlinkSync(`${filePath}/${file.name}`);
    //     }   
    // }

    if(fs.existsSync(folderPath)){
        fs.rmdirSync(folderPath,{recursive:true});
        console.log("folder deleted successfully",folderPath);
    }
}




export {
    readAllFileInsideFolderAndUploadToS3,
    deleteFileFromFolder
}