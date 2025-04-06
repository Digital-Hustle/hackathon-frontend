import { createAsyncThunk } from "@reduxjs/toolkit";
import { User, userActions } from "entities/User";
import i18n from "i18next";
import { ThunkConfig } from "app/providers/StoreProvider";
import { AuthService } from "shared/api/authService";
import {
    ACCESS_TOKEN_LOCAL_STORAGE_KEY,
    REFRESH_TOKEN_LOCAL_STORAGE_KEY,
    USER_LOCAL_STORAGE_KEY
} from "shared/const/localstorage";

interface LoginByUsernameProps {
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, ThunkConfig<string>>(
    "login/loginByUsername",
    async (authData, thunkAPI) => {
        const { rejectWithValue, dispatch } = thunkAPI;

        try {
            const response = await AuthService.login(authData.username, authData.password);

            if (!response.data) {
                throw new Error("No user data");
            }

            const user = {
                id: response.data.id,
                username: response.data.username,
            };

            localStorage.setItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY, response.data.accessToken);
            localStorage.setItem(REFRESH_TOKEN_LOCAL_STORAGE_KEY, response.data.refreshToken);


            localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user));
            dispatch(userActions.setAuthData(user));

            return response.data;
        } catch (error) {
            console.error('че',error);
            return rejectWithValue(i18n.t("Вы ввели неверный логин или пароль"));
        }
    }
);