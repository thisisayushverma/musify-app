import { PutObjectCommand, GetObjectCommand,S3Client, DeleteObjectCommand, paginateListBuckets, paginateListObjectsV2, ListObjectsV2Command, ListDirectoryBucketsCommand, ListBucketsCommand, ListObjectsCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import fs from "fs";
import mime from "mime";

const s3Client = new S3Client({
    region: process.env.AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
})


const uploadAudioFile =async (filePath)=>{
    // filePath pattern ->  ./public/audaptiveStreamAudioFiles/a2c1cf6a-33e6-423f-bd81-b951125f00f5/128k/index.m3u8
    // console.log("AWS_REGION: in s3 func", process.env.AWS_BUCKET_REGION);
    console.log("path given to s3",filePath);
    const filePathArray = filePath.split("/");
    const fileContentType = mime.getType(filePath);
    const fileReadStream = fs.createReadStream(filePath);
    const input = {
        Bucket: process.env.AWS_AUDIO_BUCKET_NAME,
        Key: `audio/${filePathArray[3]}/${filePathArray[4]}/${filePathArray[5]}`,
        Body: fileReadStream,
        ContentType: fileContentType
    }

   try {
    const command =new PutObjectCommand(input);
    const res =await s3Client.send(command);
    fileReadStream.close();
    return res;
   } catch (error) {
    console.log("error from s3 bucket",error);
    throw new Error(error)
   }

}

const downloadAudioFile = ()=>{

}

const getAudioStream =async (fileName,bitrate)=>{
    console.log("getAudioStream");
    const input = {
        Bucket: process.env.AWS_AUDIO_BUCKET_NAME,
        Key: `audio/${fileName}/${bitrate}k/index.m3u8`
    }
    
    return getSignedUrl(s3Client, new GetObjectCommand(input), { expiresIn: 60*15 });
}

const getTsFile = async (fileName,bitrate,tsFileName)=>{
    const input = {
        Bucket: process.env.AWS_AUDIO_BUCKET_NAME,
        Key: `audio/${fileName}/${bitrate}k/${tsFileName}`
    }
    try {
        return getSignedUrl(s3Client, new GetObjectCommand(input), { expiresIn: 60*5 });
    } catch (error) {
        throw new Error(error)
    }
}

const deleteFileFromS3 = async (filePath)=>{
    // filePath of Audio in s3 bucket-> audio/a2c1cf6a-33e6-423f-bd81-b951125f00f5/
    try {
        const deleteObjectCommand = new DeleteObjectCommand({
            Bucket: process.env.AWS_AUDIO_BUCKET_NAME,
            Key: `${filePath}`
        })
        const result =  await s3Client.send(deleteObjectCommand);
        console.log("file deleted from s3",result);
    } catch (error) {
        console.log("error from s3 bucket while deleting",error);
    }
}

const getAllFileAndFolderFromBucket = async (folderName)=>{
    // in this folder we got all file recursively
    try {
        const listOfAllObjectAtParticularFolder = new ListObjectsV2Command({
            Prefix:`audio/${folderName}`,
            Bucket:process.env.AWS_AUDIO_BUCKET_NAME,
        });
        const result = await s3Client.send(listOfAllObjectAtParticularFolder);
        return result
    } catch (error) {
        throw error
    }
}

export {
    uploadAudioFile,
    deleteFileFromS3,
    getAllFileAndFolderFromBucket,
    getAudioStream,
    getTsFile
}

