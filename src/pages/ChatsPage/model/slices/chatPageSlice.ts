import {createEntityAdapter, createSlice, PayloadAction,} from '@reduxjs/toolkit';
import {StateSchema} from 'app/providers/StoreProvider';
import {Chat} from "entities/Chat";
import {ChatsPageSchema} from "pages/ChatsPage/model/types/chatsPageSchema";
import {fetchChatsList} from "pages/ChatsPage/model/services/fetchChatsList/fetchChatsList";



const chatsAdapter = createEntityAdapter({
    selectId: (chat: Chat) => chat.id,
});

export const getChats = chatsAdapter.getSelectors<StateSchema>(
    (state) => state.chatsPage || chatsAdapter.getInitialState(),
);

const chatsPageSlice = createSlice({
    name: 'chatPageSlice',
    initialState: chatsAdapter.getInitialState<ChatsPageSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
        page: 1,
        hasMore: true,
        _inited: false,
        limit: 9,
        search: '',
    }),
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        initState: (state) => {
            state.limit = 5
            state._inited = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChatsList.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;

                if (action.meta.arg.replace) {
                    chatsAdapter.removeAll(state);
                }
            })
            .addCase(fetchChatsList.fulfilled, (
                state,
                action,
            ) => {
                state.isLoading = false;
                state.hasMore = action.payload.length >= state.limit;

                if (action.meta.arg.replace) {
                    chatsAdapter.setAll(state, action.payload);
                } else {
                    chatsAdapter.addMany(state, action.payload);
                }
            })
            .addCase(fetchChatsList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {
    reducer: chatsPageReducer,
    actions: chatsPageActions,
} = chatsPageSlice;