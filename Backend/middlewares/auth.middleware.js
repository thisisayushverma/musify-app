
import User from "../schema/user.schema.js";
import jwt from "jsonwebtoken";


const authMiddleware = async (req,res,next)=>{
    
    const accessToken = req.cookies?.accessToken  || req.headers?.authorization?.split(" ")[1];
    const refreshToken = req.cookies?.refreshToken || req.headers?.refreshToken?.split(" ")[1];

    if(!accessToken && !refreshToken){
        const error = new Error("Unauthorized");
        error.status=401;
        throw error;
    }


    if(!accessToken){
        // create new access token if refreshToken is valid

        const decodedRefreshToken = await User.decodedRefreshToken(refreshToken);

        if(decodedRefreshToken){
            const getUser = await User.findById(decodedRefreshToken.id);

            if(getUser){
                const newAccessToken = await getUser.generateToken();
                const newRefreshToken = await getUser.generateRefreshToken();

                res.cookie("accessToken", newAccessToken, {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000,
                });
                res.cookie("refreshToken", newRefreshToken, {
                    httpOnly: true,
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                });
                next();
            }
        }

        const error = new Error("Unauthorized");
        error.status=401;
        throw error;
    }


    // check access token is correct or not
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

    const checkUser = await User.findById(decoded?.id);

    if(!checkUser){
        const error = new Error("Unauthorized");
        error.status=401;
        throw error;
    }

    req.user = checkUser;
    next();
}

const checkAdmin =async (req,res,next)=>{

    const accessToken = req.cookies?.accessToken  || req.headers?.authorization?.split(" ")[1];

    if(!accessToken){
        const error = new Error("Unauthorized");
        error.status=401;
        throw error;
    }

    const decoded = User.decodeToken(accessToken);

    const checkUser = await User.findById(decoded?.id);

    if(!checkUser){
        const error = new Error("Unauthorized");
        error.status=401;
        throw error;
    }

    if(checkUser.email === process.env.ADMIN_EMAIL){
        next();
    }
    else{
        const error = new Error("Unauthorized-you must be admin");
        error.status=403;
        throw error;
    }
}

export {
    authMiddleware,
    checkAdmin
}
