import mongoose from "mongoose";


const connDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("DB connected");
    } catch (error) {
        throw new Error(error);
    }
}


export default connDb;