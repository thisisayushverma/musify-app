import { Worker } from "bullmq";
import IORedis from "ioredis";
import fs from "fs";    
import { convertWavIntoDifferentBitrates } from "../utils/convertAudioIntoWav.js";
import s3UploaderQueue from "../queue/uploadS3.queue.js";

const connection = new IORedis({
    host: process.env.REDIS_HOST || "localhost",
    port: parseInt(process.env.REDIS_PORT || "6379", 10),
    maxRetriesPerRequest: null
});

const abrWorker = new Worker("abr-queue", async (job) => {
    console.log("job start", job.name, job.id);

    try {
        // converting .wav into abr
        await convertWavIntoDifferentBitrates({ audioFileDestiname: job.data.audioFileDestiname, audioFileName: job.data.audioFileName, outputFileDestiname: job.data.outputFileDestiname });

        // deleting .wav file

        fs.unlinkSync(`${job.data.audioFileDestiname}/${job.data.audioFileName}.wav`);


        // calling s3 uploader queue  

        s3UploaderQueue.add("",{
            fileDestination:job.data.outputFileDestiname,
            fileName:job.data.audioFileName
        })

        console.log("job end", job.id);
    } catch (error) {
        console.log(error);
        throw error;
    }
}, {
    connection
});