import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isPlaying: false,
    currentTrack: null,  //{id,title,duration,artist,audio_url,cover_url,isLiked}
    volume: 0.5,
    duration: 0,
    currentTime: 0,
}



