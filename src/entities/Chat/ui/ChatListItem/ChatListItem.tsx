import React, {HTMLAttributeAnchorTarget} from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import * as cls from './ChatListItem.module.scss'
import {useTranslation} from "react-i18next";
import {Text} from "shared/ui/Text/Text";
import {Card, CardTheme} from "shared/ui/Card/Card";
import AppLink from "shared/ui/AppLink/AppLink";
import {RoutePath} from "shared/const/router";
import {Chat} from "../../model/types/chat";
import {Avatar} from "shared/ui/Avatar/Avatar";

interface ChatListItemProps {
    className?: string;
    chat: Chat;
    target?: HTMLAttributeAnchorTarget
}


export const ChatListItem = (props: ChatListItemProps) => {

    const { className, chat, target } = props;
    const {t} = useTranslation();

    return (
        <AppLink
            target={target}
            to={RoutePath.chats_details + chat.id} className={classNames(cls.ChatListItem, {}, [className])}>
            <Card
                theme={CardTheme.OUTLINED}
            >
                <div className={cls.header}>
                    <Avatar size={30} src={`data:image/jpeg;base64,${chat?.photo}`} />
                    <Text text={chat.name} className={cls.username} />
                </div>
            </Card>
        </AppLink>
    );
};