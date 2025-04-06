import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LoginSchema} from "../types/loginSchema";
import {loginByUsername} from "../services/loginByUsername/loginByUsername";
import {registration} from "features/AuthByUsername/model/services/register/register";


const initialState: LoginSchema = {
    isLoading: false,
    username: '',
    password: '',
    confirmPassword: '',
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUsername: (state, action : PayloadAction<string>) => {
            state.username = action.payload
        },
        setPassword: (state, action : PayloadAction<string>) => {
            state.password = action.payload
        },
        setConfirmPassword: (state, action : PayloadAction<string>) => {
            state.confirmPassword = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginByUsername.pending, (state, action) => {
                state.error = undefined
                state.isLoading = true;
            })
            .addCase(loginByUsername.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(loginByUsername.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })


            .addCase(registration.pending, (state, action) => {
                state.error = undefined
                state.isLoading = true;
            })
            .addCase(registration.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(registration.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
})

export const { actions: loginActions } = loginSlice;
export const { reducer: loginReducer } = loginSlice;