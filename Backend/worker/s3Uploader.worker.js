import dotenv from "dotenv";
dotenv.config();

import { Worker } from "bullmq";
import IORedis from "ioredis";
import { deleteFileFromFolder, readAllFileInsideFolderAndUploadToS3 } from "../utils/operationOnFile.js";


// console.log("AWS_REGION:", process.env.AWS_BUCKET_REGION);


const connection = new IORedis({
    host: process.env.REDIS_HOST || "localhost",
    port: parseInt(process.env.REDIS_PORT || "6379", 10),
    maxRetriesPerRequest: null
});


const s3UploaderWorker = new Worker("upload-s3-queue", async (job) => {
    try {
        console.log("uoloading to s3 job start", job.id);

        //  upload to s3
        await readAllFileInsideFolderAndUploadToS3(`${job.data.fileDestination}/${job.data.fileName}`)
        .then(()=>{
            // file uploading is completed and now delete  auido file from public/abr folder

            deleteFileFromFolder(`${job.data.fileDestination}/${job.data.fileName}`);
        })
        console.log("uploaded on s3 job end", job.id);
    } catch (error) {
        throw error
    }
}, {
    connection
});
