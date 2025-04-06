import {UserSchema} from "entities/User";
import {LoginSchema} from "features/AuthByUsername";
import {UnknownAction, EnhancedStore, Reducer, ReducersMapObject} from "@reduxjs/toolkit";
import {AxiosInstance} from "axios";
import {CombinedState} from "@reduxjs/toolkit/query";
import {ScrollSaveSchema} from "widgets/Page/ScrollSave";
import {rtkApi} from "shared/api/rtkApi";
import {ProfileSchema} from "features/EditableProfileCard";
import {ChatDetailsSchema} from "entities/Chat";
import {ChatsPageSchema} from "pages/ChatsPage/model/types/chatsPageSchema";
import {FileSchema} from "features/DownloadFile";


export interface StateSchema {
    user: UserSchema;
    scrollSave: ScrollSaveSchema;
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;

    // Асинхронные редюсеры
    loginForm?: LoginSchema;
    profile?: ProfileSchema;
    chatsPage?: ChatsPageSchema;
    chatDetails?: ChatDetailsSchema;
    fileDownload?: FileSchema;
}

export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    // @ts-ignore
    reduce: (state: StateSchema, action: UnknownAction) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
    //true - вмонтирован, false - демонтирован
    getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}