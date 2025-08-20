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
    audioTitle: audioFromLocalStorage?.audioTitle || "Demon Slayer",
    audioUrl: audioFromLocalStorage?.audioUrl || "63985a4b-ab21-43e1-a922-a0a52b322ec2",
    audioId: audioFromLocalStorage?.audioId || "686667963b6b2a0376421645",
    isLiked: audioFromLocalStorage?.isLiked || false,
    artist: audioFromLocalStorage?.artist || "683add8d47c27cdca0f0eb04",
    audioThumbnail: audioFromLocalStorage?.audioThumbnail || "https://res.cloudinary.com/dpvnvk0ps/image/upload/v1751567530/aivcxvrdcwwcjacoxhcx.jpg"

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