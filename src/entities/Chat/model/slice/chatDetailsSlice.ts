import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchChatById} from "entities/Chat/model/services/fetchChatById/fetchChatById";
import {Chat, ChatDetailsSchema} from "entities/Chat";


const initialState: ChatDetailsSchema = {
    isLoading: false,
    error: undefined,
    data: undefined,
};

export const chatDetailsSlice = createSlice({
    name: 'chatDetails',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchChatById.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchChatById.fulfilled, (
                state,
                action: PayloadAction<Chat>,
            ) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchChatById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: chatDetailsActions } = chatDetailsSlice;
export const { reducer: chatDetailsReducer } = chatDetailsSlice;
