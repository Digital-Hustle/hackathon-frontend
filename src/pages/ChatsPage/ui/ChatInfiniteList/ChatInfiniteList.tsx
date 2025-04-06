import React from 'react';
import {useTranslation} from "react-i18next";
import {ChatList} from "entities/Chat";
import {useSelector} from "react-redux";
import {getChatsError, getChatsIsLoading} from "../../model/selectors/chatsPageSelectors";
import {getChats} from "../../model/slices/chatPageSlice";
import {Text} from "shared/ui/Text/Text"

interface ChatInfiniteListProps {
    className?: string;
}

export const ChatInfiniteList = ({className}: ChatInfiniteListProps) => {

    const {t} = useTranslation();
    const chats = useSelector(getChats.selectAll);
    const isLoading = useSelector(getChatsIsLoading);
    const error = useSelector(getChatsError);

    if (error) {
        return <Text title={t('Произошла ошибка при загрузке чатов')}/>;
    }

    return (
        <ChatList
            isLoading={isLoading}
            chats={chats}
            className={className}
        />
    );
};