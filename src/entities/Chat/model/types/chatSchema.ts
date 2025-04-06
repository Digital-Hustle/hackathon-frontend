import {Chat} from "./chat";

export interface ChatDetailsSchema {
    isLoading: boolean;
    error?: string;
    data?: Chat;
}