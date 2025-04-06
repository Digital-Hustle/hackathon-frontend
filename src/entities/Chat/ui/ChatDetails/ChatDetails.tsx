import React, {memo, useEffect} from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import * as cls from './ChatDetails.module.scss'
import {useTranslation} from "react-i18next";
import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {Text, TextAlign, TextSize} from "shared/ui/Text/Text"
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {chatDetailsReducer} from "../../model/slice/chatDetailsSlice";
import {useSelector} from "react-redux";
import {fetchChatById} from "../../model/services/fetchChatById/fetchChatById";
import {
    getChatDetailsData,
    getChatDetailsError,
    getChatDetailsIsLoading
} from "../../model/selectors/chatDetails";
import {Skeleton} from "shared/ui/Skeleton/Skeleton";
import {Avatar} from "shared/ui/Avatar/Avatar";
import {getChats} from "pages/ChatsPage/model/slices/chatPageSlice";
import {StateSchema} from "app/providers/StoreProvider";
import {Message, MessageTheme} from "shared/ui/Message/Message";
import {Input, InputTheme} from "shared/ui/Input/Input";
import ChatIcon from "shared/assets/icons/Chat-Icon.svg";

interface ChatDetailsProps {
    className?: string;
    id: string;
}

const reducers: ReducersList = {
    chatDetails: chatDetailsReducer,
};

export const ChatDetails = memo((props: ChatDetailsProps) => {

    const {className, id} = props;
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const chats = useSelector((state: StateSchema) => getChats.selectById(state, id));
    const isLoading = useSelector(getChatDetailsIsLoading);
    const chat = useSelector(getChatDetailsData);
    const error = useSelector(getChatDetailsError);


    useEffect(() => {
        dispatch(fetchChatById(id));
    }, [dispatch, id]);


    let content;

    if (isLoading) {
        content = (
            <>
                <Skeleton className={cls.avatar} width={40} height={40} border="50%"/>
                <Skeleton className={cls.title} width={50} height={32}/>
            </>
        );
    } else if (error) {
        content = (
            <Text
                align={TextAlign.CENTER}
                title={t('Произошла ошибка при загрузке статьи.')}
            />
        );
    } else {
        content = (
            <>
                <div className={cls.header}>
                    <Avatar
                        size={40}
                        src={`data:image/jpeg;base64,${chats?.photo}`}
                        className={cls.avatar}
                    />
                    <Text
                        className={cls.title}
                        title={chats?.name}
                        size={TextSize.L}
                    />
                </div>
                <div className={cls.messages}>
                    <Message
                        theme={MessageTheme.YOUR}
                        text={`Привет пидрила как ты там?
                        Я кстати твою мамашку шлюху трахнул))))`}
                    />
                    <Message
                        theme={MessageTheme.ANOTHER}
                        text={`ТЫ АХУЕЛ
                        ВИИБУ ТЕБЯ КАК ПРИЕДУ `}
                    />
                </div>
            </>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={classNames(cls.ChatDetails, {}, [className])}>
                {content}
                <Input
                    placeholder={t('Сообщение... ')}
                    type="text"
                    icon={ChatIcon}
                    theme={InputTheme.DONE}
                />
            </div>
        </DynamicModuleLoader>
    );
});