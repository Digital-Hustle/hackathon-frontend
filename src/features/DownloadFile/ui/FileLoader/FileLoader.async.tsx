import {FC, lazy} from "react";
import {FileLoaderProps} from "./FileLoader";

export const FileLoaderAsync = lazy<FC<FileLoaderProps>>(
    () => import('./FileLoader'));