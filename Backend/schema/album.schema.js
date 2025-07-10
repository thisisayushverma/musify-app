import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
    title:{type:String,required:true},
    artist:{type:mongoose.Schema.ObjectId,ref:"User",required:true},
    image:{type:String,required:true},
    releaseDate:{type:Date,required:true},
    songs:[{type:mongoose.Schema.ObjectId,ref:"Audio"}]
},{
    timestamps:true
})


const Album = mongoose.model("Album",albumSchema);
export default Album;