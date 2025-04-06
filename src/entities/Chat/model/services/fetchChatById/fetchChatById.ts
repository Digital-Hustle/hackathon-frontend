import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "app/providers/StoreProvider";
import {Chat} from "entities/Chat";


export const fetchChatById = createAsyncThunk<
    Chat,
    string,
    ThunkConfig<string>
>(
    'chatDetails/fetchChatById',
    async (chatId, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.get(`/messages/chat/${chatId}`);

            if (!response.data) {
                throw new Error();
            }


            console.log('ответ',response.data);
            return response.data;


        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);