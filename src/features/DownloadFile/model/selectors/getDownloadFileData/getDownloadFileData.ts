import {StateSchema} from "app/providers/StoreProvider";

export const getDownloadFileData = (state: StateSchema) => state.fileDownload?.data;