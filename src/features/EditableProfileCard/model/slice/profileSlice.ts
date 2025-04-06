import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IProfile} from "entities/Profile";
import {fetchProfileData} from "../services/fetchProfileData/fetchProfileData";
import {updateProfileData} from "../services/updateProfileData/updateProfileData";
import {ProfileSchema} from "../types/editableProfileCardSchema";
import {updateProfilePhoto} from "features/EditableProfileCard/model/services/updateProfilePhoto/updateProfilePhoto";


const initialState: ProfileSchema = {
    readonly: true,
    isLoading: false,
    error: undefined,
    data: undefined,
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setReadonly: (state, action: PayloadAction<boolean>) => {
            state.readonly = action.payload;
        },
        cancelEdit: (state) => {
            state.readonly = true;
            state.validateErrors = undefined;
            state.form = state.data;
        },
        updateProfile: (state, action: PayloadAction<IProfile>) => {
            state.form = {
                ...state.form,
                ...action.payload,
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfileData.pending, (state, action) => {
                state.error = undefined
                state.isLoading = true;
            })
            .addCase(fetchProfileData.fulfilled, (state, action: PayloadAction<IProfile>) => {
                state.isLoading = false;
                state.data = action.payload
                state.form = action.payload
            })
            .addCase(fetchProfileData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })



            .addCase(updateProfileData.pending, (state) => {
                state.validateErrors = undefined
                state.isLoading = true;
            })
            .addCase(updateProfileData.fulfilled, (state, action: PayloadAction<IProfile>) => {
                state.isLoading = false;
                state.data = action.payload
                state.form = action.payload
                state.readonly = true;
                state.validateErrors = undefined
            })
            .addCase(updateProfileData.rejected, (state, action) => {
                state.isLoading = false;
                state.validateErrors = action.payload;
            })



            .addCase(updateProfilePhoto.pending, (state) => {
                state.validateErrors = undefined
                state.isLoading = true;
            })
            .addCase(updateProfilePhoto.fulfilled, (state, action: PayloadAction<string>) => {
                state.isLoading = false;

                if (state.form) {
                    state.form.photo = action.payload
                }

                state.validateErrors = undefined
            })
            .addCase(updateProfilePhoto.rejected, (state, action) => {
                state.isLoading = false;
                state.validateErrors = action.payload;
            })
    }
})

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;