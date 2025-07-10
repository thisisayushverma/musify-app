import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "../config/config.ts";

interface IUser {
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    user: {
        id: string;
        name: string;
        email: string;
        avatarUrl?: string;
        expiryDate?: Date|null;
        // any other info like bio, uploads, etc.
    } | null;
}


const initialState: IUser = {
    isAuthenticated: false,
    loading: false,
    error: null,
    user: null,
};

interface ILoginCretentials {
    email: string;
    password: string;
}

interface ILoginResponse {
    user: {
        id: string;
        name: string;
        email: string;
        avatarUrl?: string;
        // any other info like bio, uploads, etc.
    },
    token: string;
}
const loginUser = createAsyncThunk<ILoginResponse, ILoginCretentials>('user/login', async (credentials, thunkApi) => {
    try {
        const response = await fetch(config.backendUrl + '/api/auth/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("login data",data);

                return {
                    user: {
                        id: data.user.id,
                        name: data.user.name,
                        email: data.user.email,
                        avatarUrl: data.user.avatarUrl
                    },
                    token: data.token
                };
            })
            .catch((error) => {
                throw error
            });

        return response;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
})

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
            state.loading = false;
        },
        setUserLoader:(state, action) =>{
            state.loading = action.payload
        },
        setUserError:(state, action) =>{
            state.error = action.payload
        },  
        setUserLogin:(state,action)=>{
            state.user = action.payload.user
            state.isAuthenticated = true
        }
    },
    extraReducers : (builder) =>{
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                console.log("action when userLogin", action);
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.error = null;

            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    }
});


export const {logout,setUserLogin,setUserError,setUserLoader } = userSlice.actions;
export {loginUser} 

export default userSlice.reducer;