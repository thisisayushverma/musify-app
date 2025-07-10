import { Queue } from "bullmq";
import IORedis from "ioredis";

const connection = new IORedis({
    host: process.env.REDIS_HOST || "localhost",
    port: process.env.REDIS_PORT || 6379,
    maxRetriesPerRequest: 3
});


const s3UploaderQueue = new Queue("upload-s3-queue", {
    connection,
    defaultJobOptions: {
        attempts: 3,
        backoff: {
            type: 'fixed',
            delay: 1000
        },
        removeOnComplete: {
            age: 10000,
            count: 100
        }
    }
});


export default s3UploaderQueue;