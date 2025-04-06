import {createSlice} from "@reduxjs/toolkit";
import {FileSchema} from "features/DownloadFile/model/types/downloadFileSchema";
import {downloadFile} from "features/DownloadFile/model/services/downloadFile/downloadFile";


const initialState: FileSchema = {
    isLoading: false,
    error: '',
    data: '',
};

export const downloadfileSlice = createSlice({
    name: 'downloadfile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(downloadFile.pending, (state, action) => {
                state.error = undefined
                state.isLoading = true;
            })
            .addCase(downloadFile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload
            })
            .addCase(downloadFile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
})

export const { actions: downloadfileActions } = downloadfileSlice;
export const { reducer: downloadfileReducer } = downloadfileSlice;