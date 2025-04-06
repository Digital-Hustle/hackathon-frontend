import {EntityState} from "@reduxjs/toolkit";
import {Chat} from "entities/Chat";


export interface ChatsPageSchema extends EntityState<Chat, string> {
    isLoading?: boolean;
    error?: string;

    // pagination
    page: number;
    limit: number;
    hasMore: boolean;

    //filter
    search: string;

    _inited: boolean;
}
