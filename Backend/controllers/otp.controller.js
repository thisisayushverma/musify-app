import generateOtpHandler from "../utils/optGenerator.js";
import Otp from "../schema/otp.schema.js";
import asyncHandler from "../utils/asyncHandle.js";
import User from "../schema/user.schema.js";
import apiResponse from "../utils/apiResponse.js";
import { registerOtpTemplate } from "../template/otpTemplate.js";
import { emailSender } from "../utils/nodemail.js";

const generateOtp = async (email) => {
    const otp = generateOtpHandler()
    const emailExist = await Otp.findOne({ email: email });

    if (emailExist) {
        emailExist.otp = otp;
        emailExist.save();
    } else {
        const newOtp = new Otp({ email: email, otp: otp });
        await newOtp.save();
    }

    emailSender({
        to: email,
        subject: "OTP",
        otp: otp
    })

    return otp;
}


const resendOtp = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const otp = await generateOtp(email);
    return res.status(200).json(apiResponse(200, true, "Otp Sent Successfully", {}));
})

const verifyOtp = asyncHandler(async (req, res) => {
    // const { email } = req.user;
    const { otp,email } = req.body;

    if(!otp || !email){
        const error = new Error("Please add all fields");
        error.status=400;
        throw error;
    }
    const emailExist = await Otp.findOne({ email: email });

    if (emailExist) {
        if (emailExist.otp === otp) {
            // update user isVerified to true
            const makeVerifyUser = await User.findOneAndUpdate({ email: email }, { isverified: true },{ new: true });

            if (makeVerifyUser) {
                await Otp.findOneAndDelete({ email: email });
                return res.status(201).json(apiResponse(201, true, "User verified", makeVerifyUser));
            }
        }
    }

    res.status(401).json(apiResponse(401, false, "Unauthorized Access", {}));
})

export {
    generateOtp,
    verifyOtp,
    resendOtp
}