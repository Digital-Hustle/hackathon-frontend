import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "app/providers/StoreProvider";
import {ValidateProfileError} from "../../../model/types/editableProfileCardSchema";


export const updateProfilePhoto = createAsyncThunk<
    string,
    FormData,
    ThunkConfig<ValidateProfileError[]>
>(
    'profile/updateProfilePhoto',
    async (photoData, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;

        try {
            console.log('photodata',photoData);
            const response = await extra.api.post("/profile/photo", photoData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (!response.data) {
                throw new Error();
            }

            return response.data.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
        }
    },
);