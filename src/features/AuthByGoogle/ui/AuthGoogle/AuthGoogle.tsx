import React from 'react';
import {classNames} from 'shared/lib/classNames/classNames';
import * as cls from "./AuthGoogle.module.scss"
import {useTranslation} from 'react-i18next';
import {GoogleLogin} from "@react-oauth/google";
import {Text, TextSize} from "shared/ui/Text/Text";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {loginByGoogle} from "../../model/services/loginByGoogle/loginByGoogle";


interface AuthGoogleProps {
    className?: string;
    onSuccess: () => void;
}

const AuthGoogle = ({className, onSuccess}: AuthGoogleProps) => {
    const {t} = useTranslation('auth');
    const dispatch = useAppDispatch();


    return (
        <div className={classNames(cls.AuthGoogle, {}, [className])}>
            <Text
                className={cls.SocialText}
                size={TextSize.S}
                text={t('Или войти с помощью')}
            />
            <GoogleLogin
                type="icon"
                theme="filled_black"
                size="large"
                shape="circle"
                onSuccess={async (response) => {
                    try {
                        const {credential} = response;

                        if (!credential) {
                            throw new Error('Credential is missing');
                        }
                        const result = await dispatch(loginByGoogle({token: credential}));
                        if (result.meta.requestStatus === 'fulfilled') {
                            onSuccess();
                        }
                    } catch (error) {
                        console.error('Error during Google login:', error);
                    }
                }}
            />
        </div>
    );
};

export default AuthGoogle;