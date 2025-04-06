import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "app/providers/StoreProvider";
import {IProfile} from "entities/Profile";



export const fetchProfileData = createAsyncThunk<
    IProfile,
    string | undefined,
    ThunkConfig<string>
>(
    'profile/fetchProfileData',
    async (profileId, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.get<IProfile>(`/profile/id/${profileId}`);

            if (!response.data) {
                throw new Error();
            }


            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);