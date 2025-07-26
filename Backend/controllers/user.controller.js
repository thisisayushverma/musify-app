import { config } from "../constant.js";
import User from "../schema/user.schema.js";
import apiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandle.js";
import { generateOtp } from "./otp.controller.js";


const accessTokenCookieOption = {
    httpOnly: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000
}

const refreshTokenCookieOption = {
    httpOnly: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000
}

const registerUser = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        const error = new Error("Please add all fields");
        error.status = 400;
        throw error;
    }

    const userExists = await User.findOne({ email }).select("+password");

    if (userExists && userExists?.isverified) {
        const error = new Error("User already exists");
        error.status = 400;
        throw error;
    }
    else if (userExists && !userExists.isverified) {
        const checkPassword = await userExists.comparePassword(password);
        // if (checkPassword) {
        //     const token = await userExists.generateToken();
        //     res.cookie("accessToken", token, {
        //         httpOnly: true,
        //         maxAge: 24 * 60 * 60 * 1000,
        //     });
        // }
        // else {
        //     const error = new Error("User Existed,so enter correct credentials or Sign Up after 24 hrs");
        //     error.status = 401;
        //     throw error;
        // }

        if (!checkPassword) {
            const error = new Error("User Existed,so enter correct credentials or Sign Up after 24 hrs");
            error.status = 401;
            throw error;
        }
    }
    else {
        const user = new User({ name, email, password });
        await user.save();
        // const token = await user.generateToken();
        // res.cookie("accessToken", token, {
        //     httpOnly: true,
        //     maxAge: 24 * 60 * 60 * 1000,
        // })
    }

    generateOtp(email)
        .then(() => {
            res.status(201).json(apiResponse(201, true, "Otp Sent Successfully", {}));
        })
        .catch((err) => {
            throw err;
        })

});


const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        const error = new Error("Please add all fields");
        error.status = 400;
        throw error;
    }

    const userExists = await User.findOne({ email }).select("+password");

    if (!userExists) {
        const error = new Error("User does not exist");
        error.status = 400;
        throw error;
    }

    const checkPassword = await userExists.comparePassword(password);
    if (checkPassword) {
        if (userExists.isverified) {
            const { accessToken, refreshToken } = await genrateAccessAndRefreshToken(userExists._id);
            res.cookie("accessToken", accessToken, accessTokenCookieOption);
            res.cookie("refreshToken", refreshToken, refreshTokenCookieOption);
            const userData = {
                name: userExists.name,
                email: userExists.email,
                id: userExists._id,
            }
            res.status(201).json(apiResponse(201, true, "Login Successfully", { ...userData }));
        }
        else {
            generateOtp(email)
                .then(() => {
                    res.status(403).json(apiResponse(403, true, "Verify your account via submitting otp sent to your email", {}));
                })
                .catch((err) => {
                    throw err;
                })
        }

    }
    else {
        const error = new Error("Invalid Credentials");
        error.status = 401;
        throw error;
    }
})

const logoutUser = asyncHandler(async (req, res, next) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json(apiResponse(200, true, "Logout Successfully", {}));
})

const getUserDetailsByRefreshToken = asyncHandler(async (req,res,next)=>{
    const incomingAccessToken = req.cookies?.accessToken || req.headers?.authorization?.split(" ")[1];
    const incomingRefreshToken = req.cookies?.refreshToken || req.headers?.refreshToken?.split(" ")[1];

    if(!incomingRefreshToken){
        const error = new Error("Unauthorized,Please Login");
        error.status=401;
        throw error
    }

    const dataFromRefreshToken = await User.decodeRefreshToken(incomingRefreshToken);


    if(incomingAccessToken){
        const dataFromAccessToken = await User.decodeToken(incomingAccessToken);

        if(dataFromAccessToken.id !== dataFromRefreshToken.id){
            const error = new Error("Invalid Token,Try to login")
            error.status=401
            throw error
        }
    }
    
    const {accessToken,refreshToken} = await genrateAccessAndRefreshToken(dataFromRefreshToken.id);
    const user = await User.findById(dataFromRefreshToken.id).select("-password -refreshToken")

    res.cookie(config.accessToken,accessToken,accessTokenCookieOption)
    res.cookie(config.refreshToken,refreshToken,refreshTokenCookieOption)
    res.status(201).json(apiResponse(201,true,"token Generated",{
        ...user._doc
    }))
})

const genrateAccessAndRefreshToken = async (userId) => {
    const user = await User.findById(userId);
    

    const accessToken = await user.generateToken();
    const refreshToken = await user.generateRefreshToken();

    console.log("refresh Token", refreshToken);
    console.log("access Token", accessToken);

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
}

const handleRefreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies?.refreshToken || req.headers?.refreshToken?.split(" ")[1];

    const user = req.body

    if (!incomingRefreshToken || !user) {
        const error = new Error("Refresh Token or something else is  not found ");
        error.status = 401;
        throw error;
    }

    const decodedRefreshToken = await User.decodeRefreshToken(incomingRefreshToken);

    const userFromRefresh = await User.findById(decodedRefreshToken?.id);

    if (!userFromRefresh) {
        const error = new Error("Invalid Refresh Token");
        error.status = 401;
        throw error;
    }

    console.log(userFromRefresh.refreshToken,typeof userFromRefresh.refreshToken);
    console.log(userFromRefresh._id,typeof userFromRefresh._id);
    console.log(user,typeof user._id);

    if (userFromRefresh.refreshToken !== incomingRefreshToken || userFromRefresh._id.toString() !== user._id) {
        const error = new Error("Refresh Token is stolen or expired");
        error.status = 401;
        throw error;
    }

    const { accessToken, refreshToken } = await genrateAccessAndRefreshToken(userFromRefresh._id);

    res.cookie("accessToken", accessToken, accessTokenCookieOption);

    res.cookie("refreshToken", refreshToken, refreshTokenCookieOption);

    res.status(200).json(apiResponse(200, true, "Refresh Token Successfully", {}));
})

export {
    registerUser,
    loginUser,
    logoutUser,
    handleRefreshAccessToken,
    getUserDetailsByRefreshToken
}