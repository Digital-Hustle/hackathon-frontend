import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "app/providers/StoreProvider";
import {addQueryParams} from "shared/lib/url/addQueryParams/addQueryParams";
import {Chat} from "entities/Chat";
import {getChatsPageLimit, getChatsPageNum} from "pages/ChatsPage/model/selectors/chatsPageSelectors";



interface FetchChatsListProps {
    replace?: boolean;
}

interface FetchChatsListState {
    message: string;
    data: Chat[];
}

export const fetchChatsList = createAsyncThunk<
    Chat[],
    FetchChatsListProps,
    ThunkConfig<string>
>(
    'chatsPage/fetchChatsList',
    async (props, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const limit = getChatsPageLimit(getState());
        // const search = getArticlesSearch(getState());
        const page = getChatsPageNum(getState());

        try {
            addQueryParams({
                // search,
            });
            const response = await extra.api.get<FetchChatsListState>('/chats', {
                params: {
                    _limit: limit,
                    _page: page,
                    // q: search,
                },
            });

            if (!response.data) {
                throw new Error();
            }

            return response.data.data;
        } catch (e) {
            return rejectWithValue('error');
        }
    },
);
