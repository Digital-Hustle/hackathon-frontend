import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "app/providers/StoreProvider";
import {getChatsHasMore, getChatsIsLoading, getChatsPageNum} from "pages/ChatsPage/model/selectors/chatsPageSelectors";
import {chatsPageActions} from "pages/ChatsPage/model/slices/chatPageSlice";
import {fetchChatsList} from "pages/ChatsPage/model/services/fetchChatsList/fetchChatsList";


export const fetchNextChatsPage = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>(
    'chatsPage/fetchNextChatsPage',
    async (_, thunkApi) => {
        const { getState, dispatch } = thunkApi;
        const hasMore = getChatsHasMore(getState());
        const page = getChatsPageNum(getState());
        const isLoading = getChatsIsLoading(getState());

        if (hasMore && !isLoading) {
            dispatch(chatsPageActions.setPage(page + 1));
            dispatch(fetchChatsList({}));
        }
    },
);
