import ffmpeg from "fluent-ffmpeg";
import ffmpegStatic from "ffmpeg-static"
import fs from "fs";
import { deleteFileFromFolder, readAllFileInsideFolderAndUploadToS3 } from "./operationOnFile.js";
// import {  } from "./awsS3Bucket.js";


ffmpeg.setFfmpegPath(ffmpegStatic)

const convertIntoWav = async (fileSpecification) => {
    const { audioFileDestiname, audioFileName,outputFileDestiname } = fileSpecification;
    // const fileName = filePath.split("/")[filePath.split("/").length - 1].split(".")[0];


    // './public/wavAudio/' + fileName + '.wav'
    const stream = fs.createWriteStream(`${outputFileDestiname}/${audioFileName}.wav`);
    await (new Promise((resolve, reject) => {
        ffmpeg(`${audioFileDestiname}/${audioFileName}`)
            .toFormat('wav')
            .output(stream)
            .on("start", (startCommand) => {
                console.log("wav converstion is started", startCommand);
            })
            .on("end", () => {
                console.log("wav conversion is completed");
                // fs.unlinkSync(`${audioFileDestiname}/${audioFileName}`);
                stream.close();
                resolve();
            })
            .on("error", (err) => {
                console.log(err);
                reject(err);
            })
            .run();

    }))

    // await convertWavIntoDifferentBitrates(`./public/wavAudio/${fileName}.wav`);
}

const convertWavIntoDifferentBitrates = async (fileSpecification) => {

    const { audioFileDestiname, audioFileName,outputFileDestiname } = fileSpecification;
    const filePath = `${audioFileDestiname}/${audioFileName}.wav`;

    const bitrates = [128, 256, 320];
    // const dirName = filePath.split("/")[filePath.split("/").length - 1].split(".")[0];
    try {
        fs.mkdirSync(`${outputFileDestiname}/${audioFileName}`, { recursive: true });
        fs.mkdirSync(`${outputFileDestiname}/${audioFileName}/128k`, { recursive: true });
        fs.mkdirSync(`${outputFileDestiname}/${audioFileName}/256k`, { recursive: true });
        fs.mkdirSync(`${outputFileDestiname}/${audioFileName}/320k`, { recursive: true });

        await (Promise.all(bitrates.map((item) => {
            return new Promise((resolve, reject) => {
                ffmpeg(filePath)
                    .audioCodec('aac')
                    .audioBitrate(item)
                    .format("hls")
                    .output(`./${outputFileDestiname}/${audioFileName}/${item}k/index.m3u8`)
                    .outputOptions([
                        "-hls_time 10",
                        "-hls_list_size 0",
                        "-hls_playlist_type vod",
                        `-hls_segment_filename ${outputFileDestiname}/${audioFileName}/${item}k/segment_%03d.ts`,
                        "-max_muxing_queue_size 1024"
                    ])
                    .on("start", (startCommand) => {
                        console.log("ABR converstion is started\n", startCommand);
                    })
                    .on("end", () => {
                        console.log("ABR conversion is completed");
                        resolve();
                    })
                    .on("error", (err) => {
                        console.log(err);
                        reject(err);
                    })
                    .run();
            })
            
        }
        )))
        // upload on s3 bucket
        // console.log("wav completed", filePath);

        // await readAllFileInsideFolderAndUploadToS3(`${baseDir}/${dirName}`);
        
        // fs.unlinkSync(filePath);
    } catch (error) {
        console.log("error while conversion to abr",error);
        // deleteFileFromFolder(`${baseDir}/${dirName}`);
    }
}


export {
    convertIntoWav,
    convertWavIntoDifferentBitrates
}