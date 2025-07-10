import { Worker } from "bullmq";
import IORedis from "ioredis";
import fs from "fs"
import { convertIntoWav } from "../utils/convertAudioIntoWav.js";
import abrQueue from "../queue/adaptiveBitrate.queue.js";

const connection = new IORedis({
    host: process.env.REDIS_HOST || "localhost",
    port: parseInt(process.env.REDIS_PORT || "6379", 10),
    maxRetriesPerRequest: null
});

const wavWorker = new Worker("wav-queue", async (job) => {
    console.log("job start", job.name, job.id);
    try {
        // convert original audio into .wav 
        await convertIntoWav({ audioFileDestiname: job.data.audioFileDestiname, audioFileName: job.data.audioFileName, outputFileDestiname: "./public/wavAudio" });


        // delete original audio file from public dictory

        fs.unlinkSync(`${job.data.audioFileDestiname}/${job.data.audioFileName}`);


        // pushing .wav file in abr queue

        abrQueue.add("abrConverter", {
            audioFileDestiname: "./public/wavAudio",
            audioFileName: job.data.audioFileName,
            outputFileDestiname: "./public/adaptiveStreamAudioFiles"
        })
        console.log("audio conversion step 1 end", job.id);
    } catch (error) {
        console.log(error);
        throw error;
    }
}, {
    connection
});




