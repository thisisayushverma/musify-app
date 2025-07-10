import { Queue } from "bullmq";
import IORedis from "ioredis";

const connection = new IORedis({
    host:process.env.REDIS_HOST || "localhost",
    port:process.env.REDIS_PORT || 6379,
    maxRetriesPerRequest:3
}); 

const practQueue = new Queue("pract-queue",connection);

const wavQueue = new Queue("wav-queue");
const abrQueue = new Queue("abr-queue");
const uploadS3Queue = new Queue("upload-s3-queue");

await wavQu

await practQueue.add("process-one",{
    data:"hello world"
})


