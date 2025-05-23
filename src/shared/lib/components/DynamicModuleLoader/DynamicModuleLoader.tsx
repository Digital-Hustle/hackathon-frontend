import React, {FC, ReactNode, useEffect} from 'react';
import {useDispatch, useStore} from "react-redux";
import {ReduxStoreWithManager, StateSchemaKey} from "app/providers/StoreProvider/config/StateSchema";
import {Reducer} from "@reduxjs/toolkit";


export type ReducersList = {
    [name in StateSchemaKey]?: Reducer;
}

interface DynamicModuleLoaderProps {
    children?: ReactNode;
    reducers: ReducersList;
    removeAfterUnmount?: boolean;
}


export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props: DynamicModuleLoaderProps) => {
    const {children, reducers, removeAfterUnmount} = props

    const store = useStore() as ReduxStoreWithManager;
    const dispatch = useDispatch();

    useEffect (() => {
        const mountedReducers = store.reducerManager.getMountedReducers();


        Object.entries(reducers).forEach(([name, reducer]) => {
            const mounted = mountedReducers[name as StateSchemaKey];
            if (!mounted) {
                store.reducerManager.add(name as StateSchemaKey, reducer);
                dispatch({type: `@INIT ${name} reducer`});
            }
        })

        return () => {
            if (removeAfterUnmount) {
                Object.entries(reducers).forEach(([name, reducer]) => {
                    store.reducerManager.remove(name as StateSchemaKey);
                    dispatch({type: `@DESTROY ${name} reducer`});
                })
            }
        }
    },[])

    return (
        <>
            {children}
        </>
    );
};