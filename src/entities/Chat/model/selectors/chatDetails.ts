import { StateSchema } from 'app/providers/StoreProvider';

export const getChatDetailsData = (state: StateSchema) => state.chatDetails?.data;
export const getChatDetailsIsLoading = (state: StateSchema) => state.chatDetails?.isLoading || false;
export const getChatDetailsError = (state: StateSchema) => state.chatDetails?.error;