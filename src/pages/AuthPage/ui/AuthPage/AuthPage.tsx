import React, {memo} from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import * as cls from './LoginPage.module.scss'
import {useTranslation} from "react-i18next";
import {Page} from "widgets/Page/Page";
import {AuthenticationWidget} from "widgets/AuthenticationWidget/AuthenticationWidget";

interface AuthPageProps {
    className?: string;
}

const AuthPage = ({className}: AuthPageProps) => {

    const {t} = useTranslation();

    return (
        <Page className={classNames(cls.wrapper, {}, [className])}>
            <AuthenticationWidget />
        </Page>
    );
};

export default memo(AuthPage);