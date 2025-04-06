import {StateSchema} from "app/providers/StoreProvider";

export const getDownloadFileError = (state: StateSchema) => state.fileDownload?.error;