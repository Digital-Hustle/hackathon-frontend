import React, {useCallback} from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import * as cls from './AuthenticationWidget.module.scss'
import {useTranslation} from "react-i18next";
import {AuthForm} from "features/AuthByUsername";
import {AuthGoogle} from "features/AuthByGoogle";
import {TnsModel} from "shared/ui/TnsModel/TnsModel";
import {useNavigate} from "react-router-dom";
import {RoutePath} from "shared/const/router";

interface AuthenticationWidgetProps {
    className?: string;
}

export const AuthenticationWidget = ({className}: AuthenticationWidgetProps) => {

    const {t} = useTranslation();
    const navigate = useNavigate();

    const onSuccess = useCallback(() => {
        navigate(`${RoutePath.main}` );
    }, [navigate]);


    return (
        <div className={classNames(cls.AuthenticationWidget, {}, [className])}>
            <div className={cls.LoginForm}>
                <AuthForm onSuccess={onSuccess}/>
                <AuthGoogle onSuccess={onSuccess}/>
            </div>
            <TnsModel />
        </div>
    );
};