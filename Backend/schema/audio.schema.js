import mongoose from "mongoose";

const audioSchema = new mongoose.Schema({
    artist:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    title:{
        type:String,
        required:true
    },
    audioUuId:{
        type:String
    },
    image_url:{
        type:String
    },
    updatedAt:{
        type:Date,
        default:Date.now
    },
    genre:{
        type:String
    },
    duration:{
        type:Number
    },
    isPublic:{
        type:Boolean,
        default:false
    },
    tags:{
        type:[String]
    }

})


const Audio  = mongoose.model('Audio', audioSchema);
export default Audio