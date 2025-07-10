import { createSlice } from "@reduxjs/toolkit";
import config from "../config/config";

interface IPlayer {
    isPlaying:Boolean,
    volume:number,
    currentTime:number,
    duration:number,
}

const initialState:IPlayer = {
    isPlaying:false,
    volume:0.5,
    currentTime:0,
    duration:734
} 

const playerSlice = createSlice({
    name: "player",
    initialState,
    reducers: {
        setIsPlaying: (state) => {
            state.isPlaying = !state.isPlaying;
            localStorage.setItem(config.playerStatusLocalStorageKey,JSON.stringify(state))
        },
        setVolume: (state, action) => {
            state.volume = action.payload;
            localStorage.setItem(config.playerStatusLocalStorageKey,JSON.stringify(state))
        },
        setCurrentTime: (state, action) => {
            state.currentTime = action.payload;
            localStorage.setItem(config.playerStatusLocalStorageKey,JSON.stringify(state))
        },
        setDuration: (state, action) => {
            state.duration = action.payload;
            state.currentTime = 0;
            localStorage.setItem(config.playerStatusLocalStorageKey,JSON.stringify(state))
        },
    }
})


export const {setIsPlaying,setVolume,setCurrentTime,setDuration} = playerSlice.actions;
export default playerSlice.reducer