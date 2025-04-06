import {StateSchema} from "app/providers/StoreProvider";


export const getChatsIsLoading = (state: StateSchema) => state.chatsPage?.isLoading;
export const getChatsError = (state: StateSchema) => state.chatsPage?.error;
export const getChatsPageNum = (state: StateSchema) => state.chatsPage?.page || 1;
export const getChatsPageLimit = (state: StateSchema) => state.chatsPage?.limit || 9;
export const getChatsHasMore = (state: StateSchema) => state.chatsPage?.hasMore;
export const getChatsInited = (state: StateSchema) => state.chatsPage?._inited;
export const getChatsSearch = (state: StateSchema) => state.chatsPage?.search ?? '';