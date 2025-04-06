import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "app/providers/StoreProvider";
import {getChatsInited} from "pages/ChatsPage/model/selectors/chatsPageSelectors";
import {fetchChatsList} from "pages/ChatsPage/model/services/fetchChatsList/fetchChatsList";
import {chatsPageActions} from "pages/ChatsPage/model/slices/chatPageSlice";




export const initChatsPage = createAsyncThunk<
    void,
    URLSearchParams,
    ThunkConfig<string>
>(
    'chatsPage/initChatsPage',
    async (searchParams, thunkApi) => {
        const { getState, dispatch } = thunkApi;
        const inited = getChatsInited(getState());

        if (!inited) {
            const searchFromUrl = searchParams.get('search');

            if (searchFromUrl) {
                dispatch(chatsPageActions.setSearch(searchFromUrl));
            }

            dispatch(chatsPageActions.initState());
            dispatch(fetchChatsList({}));
        }
    },
);