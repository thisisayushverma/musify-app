import { createSlice } from "@reduxjs/toolkit";
import config from "../config/config.ts";


interface IAudio {
    audioTitle: string,
    audioUrl: string,
    audioThumbnail: string,
    audioId: string,
    isLiked: boolean,
    artist: string
}


const audioFromLocalStorage = JSON.parse(localStorage.getItem(config.audioDetailsLocalStorageKey) || '{}');


const initialState: IAudio = {
    audioTitle: audioFromLocalStorage?.audioTitle || "",
    audioUrl: audioFromLocalStorage?.audioUrl || "",
    audioId: audioFromLocalStorage?.audioId || "",
    isLiked: audioFromLocalStorage?.isLiked || false,
    artist: audioFromLocalStorage?.artist || "",
    audioThumbnail: audioFromLocalStorage?.audioThumbnail || ""
}

const audioSlice = createSlice({
    name: "audio",
    initialState,
    reducers: {
        setAudio: (state, action) => {
            state.audioTitle = action.payload.audioTitle;
            state.audioUrl = action.payload.audioUrl;
            state.audioId = action.payload.audioId;
            state.isLiked = action.payload.isLiked;
            state.artist = action.payload.artist;
            state.audioThumbnail = action.payload.audioThumbnail;
            localStorage.setItem(config.audioDetailsLocalStorageKey,JSON.stringify(state))
        },
        setIsLiked: (state) => {
            state.isLiked = !state.isLiked;
            localStorage.setItem(config.audioDetailsLocalStorageKey,JSON.stringify(state))
        }
    }
})


export const { setAudio,setIsLiked } = audioSlice.actions;
export default audioSlice.reducer