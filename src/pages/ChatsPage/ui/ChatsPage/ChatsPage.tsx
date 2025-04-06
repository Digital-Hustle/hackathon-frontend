import React, {memo, useCallback, useEffect} from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import * as cls from './ChatsPage.module.scss'
import {useTranslation} from "react-i18next";
import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {chatsPageReducer} from "../../model/slices/chatPageSlice";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {useSearchParams} from "react-router-dom";
import {Page} from "widgets/Page/Page";
import {ChatInfiniteList} from "../../ui/ChatInfiniteList/ChatInfiniteList";
import {fetchNextChatsPage} from "../../model/services/fetchNextChatsPage/fetchNextChatsPage";
import {initChatsPage} from "../../model/services/initChatsPage/initChatsPage";

interface ChatsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    chatsPage: chatsPageReducer,
};

const ChatsPage = ({className}: ChatsPageProps) => {

    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextChatsPage());
    }, [dispatch]);

    useEffect(() => {
        dispatch(initChatsPage(searchParams));
    });

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>

            <Page
                onScrollEnd={onLoadNextPart}
                className={classNames(cls.ChatsPage, {}, [className])}
            >
                <ChatInfiniteList/>
            </Page>
        </DynamicModuleLoader>
    )
};

export default memo(ChatsPage);