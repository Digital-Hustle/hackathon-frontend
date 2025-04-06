import React, {useCallback} from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import * as cls from './ChatDetailsPage.module.scss'
import {useTranslation} from "react-i18next";
import {useNavigate, useParams} from "react-router-dom";
import {Page} from "widgets/Page/Page";
import {ChatDetails} from "entities/Chat/ui/ChatDetails/ChatDetails";
import {RoutePath} from "shared/const/router";
import {Button, ButtonTheme} from "shared/ui/Button/Button";

interface ChatDetailsPageProps {
    className?: string;
}


const ChatDetailsPage = ({className}: ChatDetailsPageProps) => {

    const {t} = useTranslation();
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const onBackToList = useCallback(() => {
        navigate(RoutePath.chats);
    }, [navigate])

    if (!id) {
        return (
            <Page className={classNames(cls.ChatDetailsPage, {}, [className])}>
                {t('Статья не найдена')}
            </Page>
        );
    }

    return (
        <Page className={classNames(cls.ChatDetailsPage, {}, [className])}>
            <Button
                className={cls.back}
                theme={ButtonTheme.OUTLINE}
                onClick={onBackToList}
            >
                {t('Назад к списку')}
            </Button>
            <ChatDetails id={id} />
        </Page>
    );
};

export default ChatDetailsPage;