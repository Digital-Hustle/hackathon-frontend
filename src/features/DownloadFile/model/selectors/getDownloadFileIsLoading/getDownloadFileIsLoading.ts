import {StateSchema} from "app/providers/StoreProvider";

export const getDownloadFileIsLoading = (state: StateSchema) => state.fileDownload?.isLoading;