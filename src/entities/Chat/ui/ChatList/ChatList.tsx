import React, {HTMLAttributeAnchorTarget, memo} from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import * as cls from './ChatList.module.scss'
import {useTranslation} from "react-i18next";
import {Chat} from "../../model/types/chat";
import {ChatListItem} from "entities/Chat/ui/ChatListItem/ChatListItem";

interface ChatListProps {
    className?: string;
    chats: Chat[];
    isLoading?: boolean;
    target?: HTMLAttributeAnchorTarget;
}


// const getSkeletons = (view: ArticleView) => new Array(view === ArticleView.SMALL ? 9 : 3)
//     .fill(0)
//     .map((item, index) => (
//         <ArticleListItemSkeleton className={cls.card} key={index} view={view} />
//     ));

export const ChatList = (props: ChatListProps) => {

    const {
        className,
        chats,
        isLoading,
        target
    } = props;

    const {t} = useTranslation();



    const renderChat = (chat: Chat | undefined) => {
        if (!chat) return null;
        return (
            <ChatListItem
                className={cls.card}
                chat={chat}
                key={chat.id}
                target={target}
            />
        );
    };

    return (
        <div className={classNames(cls.ChatList, {}, [className])}>
            {chats.length > 0
                ? chats.map(renderChat)
                : null}
            {/*{isLoading && getSkeletons(view)}*/}
        </div>
    );
};