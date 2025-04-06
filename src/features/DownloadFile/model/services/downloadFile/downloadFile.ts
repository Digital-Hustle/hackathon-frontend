import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "app/providers/StoreProvider";


export const downloadFile = createAsyncThunk<
    string,
    FormData,
    ThunkConfig<string>
>(
    'profile/updateProfilePhoto',
    async (fileData, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;

        try {
            console.log('filedata',fileData);
            const response = await extra.api.post("/", fileData, {
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
            return rejectWithValue;
        }
    },
);