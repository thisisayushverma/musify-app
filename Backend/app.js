import cors from "cors";
dotenv.config();

import express from "express";
import dotenv from "dotenv";
import reqLogger from "./utils/reqLogger.js";
import apiResponse from "./utils/apiResponse.js";
import cookieParser from "cookie-parser";
import crypto from "crypto"
import fs from "fs"

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_DOMAIN,
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(reqLogger);


// Routes
import userRoutes from "./routes/user.routes.js"
import otpRoutes from "./routes/otp.routes.js"
import audioRoutes from "./routes/audio.routes.js"
import testRoutes from "./routes/testFunc.routes.js"
import { readAllFileInsideFolderAndUploadToS3 } from "./utils/operationOnFile.js"
import { getAudioStream } from "./utils/awsS3Bucket.js";
import authRoutes from "./routes/auth.routes.js"
import { getSignedCookies } from "@aws-sdk/cloudfront-signer";
app.use('/api/user', userRoutes)
app.use('/api/otp', otpRoutes)
app.use('/api/audio', audioRoutes)
app.use('/api/test', testRoutes)
app.use('/api/auth', authRoutes)
app.get('/', (req, res) => res.send("Hello world"));
// app.get('/convert-audio',async (req,res)=>{
//     console.log("convert-audio");
//     await convertIntoWav("./public/uploaded/shivji.m4a")
//     .then(() => {
//         console.log("Audio converted");
//         res.send("Audio converted");
//     })
//     .catch((err) => {
//         console.log("Audio not converted");
//         res.send("Audio not converted");
//     })

// })
app.get('/upload-file', async (req, res) => {
    console.log("hey upload file");
    await readAllFileInsideFolderAndUploadToS3("./public/adaptiveStreamAudioFiles/a2c1cf6a-33e6-423f-bd81-b951125f00f5");
    return res.send("File uploaded");
})

app.get('/api/get-audio/:audioId/:bitrate', async (req, res) => {
    const { audioId, bitrate } = req.params;
    console.log("function run hua tha");

    const privateKey = fs.readFileSync("./private_key.pem", "utf-8");
    const keyPairId = process.env.AWS_CLOUDFRONT_KEY_PAIR_ID

    const resourcePath = `${process.env.AWS_CLOUDFRONT_DOMAIN}/${audioId}/${bitrate}/*`;
    const policy = {
        Statement: [
            {
                Resource: resourcePath,
                Condition: {
                    DateLessThan: {
                        'AWS:EpochTime': Math.floor(Date.now() / 1000) + 60 * 60 // 1 hour
                    }
                }
            }
        ]
    };
    const policyString = JSON.stringify(policy);

    const urlForFile = `${process.env.AWS_CLOUDFRONT_DOMAIN}/${audioId}/${bitrate}/index.m3u8`;

    const signedCookies = getSignedCookies({
        keyPairId,
        privateKey,
        policy:policyString
    })




    // const policyStringBase64 = Buffer.from(policyString).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');


    // const signature = crypto.sign('sha256', Buffer.from(policyString), {
    //     key: privateKey,
    //     padding: crypto.constants.RSA_PKCS1_PADDING,
    // }).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');

    // console.log("signature", signature);
    // console.log("policy string", policyStringBase64);
    // console.log("key pair id", keyPairId);

    console.log("signed cookies", signedCookies);

    const cookieOption = {
        secure: true,
        domain: '.ayushverma.dev',
        sameSite: 'none',
        path: '/',
    }

    Object.keys(signedCookies).map((key) => {
        res.cookie(key, signedCookies[key], cookieOption)
    })

    // res.cookie('CloudFront-Policy', policyStringBase64, )
    // res.cookie('CloudFront-Signature', signature, {
    //     httpOnly: true,
    //     secure: true,
    //     domain: '.ayushverma.dev',
    //     sameSite: 'none',
    //     path: '/',
    // })
    // res.cookie('CloudFront-Key-Pair-Id', keyPairId, { 
    //     httpOnly: true,
    //     secure: true,
    //     domain: '.ayushverma.dev',
    //     sameSite: 'none',
    //     path: '/',
    // })

    // let cookie = {
    //     "CloudFront-Policy": policyStringBase64,
    //     "CloudFront-Signature": signature,
    //     "CloudFront-Key-Pair-Id": keyPairId
    // }
    res.status(200).json({
        status: 200,
        message: "Audio Stream",
        url: urlForFile,
        signedCookies,
        cookieOption
    })
})



app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).json(apiResponse(err.status || 500, false, err.message, {}));
})



export default app;
