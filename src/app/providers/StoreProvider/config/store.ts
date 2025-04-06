import {configureStore, Reducer, ReducersMapObject} from '@reduxjs/toolkit'
import {userReducer} from "entities/User";
import {$api} from "shared/api/api";
import {StateSchema, ThunkExtraArg} from "./StateSchema";
import {createReducerManager} from "./reducerManager";
import {CombinedState} from "@reduxjs/toolkit/query";
import {ScrollSaveReducer} from "widgets/Page/ScrollSave";
import {rtkApi} from "shared/api/rtkApi";



export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        user: userReducer,
        scrollSave: ScrollSaveReducer,
        [rtkApi.reducerPath]: rtkApi.reducer,
    };

    const reducerManager = createReducerManager(rootReducers);

    const extraArg: ThunkExtraArg = {
        api: $api,
    };

    const store = configureStore({
        // @ts-ignore
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            thunk: {
                extraArgument: extraArg,
            },
        }).concat(rtkApi.middleware),
    });

    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];