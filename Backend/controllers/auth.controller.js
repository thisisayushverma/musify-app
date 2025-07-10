import User from "../schema/user.schema.js";
import apiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandle.js";

const handleCheckAccessTokenPresent = asyncHandler(async (req,res)=>{
    const incomingAccessToken = req.cookies?.accessToken || req.headers?.authorization?.split(" ")[1];

    const incomingRefreshToken = req.cookies?.refreshToken || req.headers?.refreshToken?.split(" ")[1];

    const user = req.body;

    if(!incomingRefreshToken || !user){
        const error = new Error("Unauthenticated,Login Please")
        error.status=401
        throw error
    }

    const decodedRefreshToken = await User.decodeRefreshToken(incomingRefreshToken)

    // console.log(decodedRefreshToken,typeof user._id);

    if(decodedRefreshToken.id !== user._id ){
        const error = new Error("Unauthenticated or Invalid credentials")
        error.status=401
        throw error
    }


    if(!incomingAccessToken){
        const error = new Error("Unauthorized")
        error.status=403
        throw error
    }

    res.status(204).json(apiResponse(204,true,"authorization successfull",{}))

})

export {
    handleCheckAccessTokenPresent,
  
}