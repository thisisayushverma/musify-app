import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image_url: {
        type: String,
        required: true
    },
    songs: [
        { 
            type: mongoose.Schema.ObjectId, 
            ref: "Audio" 
        }
    ],
    is_public: {
        type: Boolean,
        default: false
    },
    create_by: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
},
    {
        timestamps: true
    }
)


const Playlist = mongoose.model("Playlist", playlistSchema);

export default Playlist;