import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import reqLogger from "./utils/reqLogger.js";
import apiResponse from "./utils/apiResponse.js";
import cookieParser from "cookie-parser";
import crypto from "crypto"
import fs from "fs"

dotenv.config();
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
    //const privateKey = process.env.AWS_CLOUDFRONT_PRIVATE_KEY.replace(/\\n/g,'\n')
    const privateKey = fs.readFileSync("./private_key.pem", "utf-8");
    const keyPairId = process.env.AWS_CLOUDFRONT_KEY_PAIR_ID

    const resourcePath = `${process.env.AWS_CLOUDFRONT_DOMAIN}/*`;
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
    const policyStringBase64 = Buffer.from(policyString).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');


    const signer = crypto.createSign('RSA-SHA1');
	signer.update(policyString);
	const signature = signer.sign({
	    key: privateKey,
	    padding: crypto.constants.RSA_PKCS1_PADDING
	});

	

    const encodedSignature = signature.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');


    console.log("signature", encodedSignature);
    console.log("policy string", policyStringBase64);
    console.log("key pair id", keyPairId);

    res.cookie('CloudFront-Policy', policyStringBase64, {
        httpOnly: true,
        domain: '.ayushverma.dev',
        sameSite: 'none',
        secure: true,
        path: '/',
    })
    res.cookie('CloudFront-Signature', encodedSignature, {
        httpOnly: true,
        domain: '.ayushverma.dev',
        sameSite: 'none',
	secure: true,
        path: '/',
    })
    res.cookie('CloudFront-Key-Pair-Id', keyPairId, { 
        httpOnly: true,
        domain: '.ayushverma.dev',
	secure: true,
        sameSite: 'none',
        path: '/',
    })

    let cookie = {
        "CloudFront-Policy": policyStringBase64,
        "CloudFront-Signature": signature,
        "CloudFront-Key-Pair-Id": keyPairId
    }
    res.status(200).json({
        status: 200,
        message: "Audio Stream",
        url: `${process.env.AWS_CLOUDFRONT_DOMAIN}/audio/${req.params.audioId}/${req.params.bitrate}/index.m3u8`,
        cookie,
        cookeiSettings: {
            httpOnly: true,
            secure: true,
            domain: 'da7xhgecx5wu2.cloudfront.net',
            sameSite: 'none',
            path: '/',
        }
    })
})



app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).json(apiResponse(err.status || 500, false, err.message, {}));
})



export default app;
