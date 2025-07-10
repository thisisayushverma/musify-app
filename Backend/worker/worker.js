import { Worker } from "bullmq";
import IORedis from "ioredis";
import { set } from "mongoose";

const connection = new IORedis({
    host:process.env.REDIS_HOST || "localhost",
    port:parseInt(process.env.REDIS_PORT || "6379", 10),
    maxRetriesPerRequest:null
}); 

const temp = async () => {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve();
        },5000)
    })
}


const pracWorker = new Worker("pract-queue",async (job) => {
    console.log("job start",job.id);
    await temp();
    console.log("job end",job.id);
}, {
    connection
});








