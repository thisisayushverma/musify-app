import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../reduxSlice/userSlice.ts"
import audioSlice from "../reduxSlice/audioSlice.ts"
import playerSlice from "../reduxSlice/playerSLice.ts"

export const store = configureStore({
    reducer: {
        user:userSlice,
        audio:audioSlice,
        player:playerSlice
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch