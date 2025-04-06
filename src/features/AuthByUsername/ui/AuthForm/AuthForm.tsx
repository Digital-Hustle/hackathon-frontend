import React, {FormEvent, memo, useCallback, useEffect, useMemo, useState} from 'react';
import {classNames} from 'shared/lib/classNames/classNames';
import * as cls from './AuthForm.module.scss';
import {useTranslation} from 'react-i18next';
import {Button, ButtonTheme} from 'shared/ui/Button/Button';
import {Input, InputTheme} from 'shared/ui/Input/Input';
import {useSelector} from 'react-redux';
import {loginActions, loginReducer} from '../../model/slices/loginSlice';
import {Text, TextSize, TextTheme} from 'shared/ui/Text/Text';
import {DynamicModuleLoader, ReducersList} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {useAppDispatch} from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {getLoginIsLoading} from "../../model/selectors/getLoginIsLoading/getLoginIsLoading";
import {getLoginError} from "../../model/selectors/getLoginError/getLoginError";
import {loginByUsername} from "../../model/services/loginByUsername/loginByUsername";
import {InputState, useInput} from "shared/lib/hooks/useInput/useInput";
import MailIcon from "shared/assets/icons/Mail-Icon.svg"
import passwordIco from "shared/assets/icons/unlock.svg";
import {TabItem, Tabs} from "shared/ui/Tabs/Tabs";
import {registration} from "../../model/services/register/register";
import {getLoginUsername} from "../../model/selectors/getLoginUsername/getLoginUsername";
import {getLoginPassword} from "../../model/selectors/getLoginPassword/getLoginPassword";
import {
    getLoginConfirmPassword
} from "../../model/selectors/getLoginConfrimPassword/getLoginConfirmPassword";


export interface AuthFormProps {
    className?: string;
    onSuccess: () => void;
}

const initialReducers: ReducersList = {
    loginForm: loginReducer,
};

const AuthForm = ({className, onSuccess}: AuthFormProps) => {
    const {t} = useTranslation('auth');
    const dispatch = useAppDispatch();
    const usernameState = useSelector(getLoginUsername)
    const passwordState = useSelector(getLoginPassword)
    const confirmPasswordState = useSelector(getLoginConfirmPassword)
    const isLoading = useSelector(getLoginIsLoading);
    const error = useSelector(getLoginError);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isRegistrationMode, setIsRegistrationMode] = useState(false);

    const typeTabs = useMemo<TabItem[]>(() => [
        {
            value: 'login',
            content: t('Войти'),
        },
        {
            value: 'register',
            content: t('Регистрация'),
        },
    ], [t]);

    const onTabClick = useCallback((tab: TabItem) => {
        setIsRegistrationMode(tab.value === 'register');
    }, []);

    const onChangeUsername = useCallback((value: string) => {
        dispatch(loginActions.setUsername(value));
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value));
    }, [dispatch]);

    const onChangeConfirmPassword = useCallback((value: string) => {
        dispatch(loginActions.setConfirmPassword(value));
    }, [dispatch]);


    const username = useInput('', {
            isEmpty: true,
            minlength: 5,
            isEmail: true,
        },
        onChangeUsername);

    const password = useInput('', {
            isEmpty: true,
            minlength: 5,

        },
        onChangePassword);

    const confirmPassword = useInput('', {
            isEmpty: true,
            minlength: 5,
            match: password.value,

        },
        onChangeConfirmPassword);


    const getInputTheme = (inputState: InputState): InputTheme => {
        if (!inputState.isDirty) return InputTheme.CLEAR;
        if (!inputState.wasBlurred) return inputState.inputValid ? InputTheme.DONE : InputTheme.NOTIFICATION;
        return inputState.inputValid ? InputTheme.DONE : InputTheme.ERROR;
    };

    const usernameInputTheme = useMemo(() => getInputTheme(username), [username]);
    const passwordInputTheme = useMemo(() => getInputTheme(password), [password]);
    const confirmPasswordInputTheme = useMemo(() => getInputTheme(confirmPassword), [confirmPassword]);

    const isButtonDisabled = (!username.inputValid && username.isDirty)
        || (!password.inputValid && password.isDirty) || isLoading ||
        (isSubmitted && (!username.inputValid || !password.inputValid || !confirmPassword.inputValid)) ||
        (!confirmPassword.inputValid && confirmPassword.isDirty)

    useEffect(() => {
        username.onChange('');
        password.onChange('');
        confirmPassword.onChange('');

        username.setIsDirty(false);
        password.setIsDirty(false);
        confirmPassword.setIsDirty(false);
        setIsSubmitted(false);
    }, [isRegistrationMode]);


    const onLoginClick = useCallback(async () => {
        if (!username.inputValid || !password.inputValid || (isRegistrationMode && password.value !== confirmPassword.value)) {
            setIsSubmitted(true);
        }

        if (!username.isDirty) {
            username.setIsDirty(true);
        }
        if (!password.isDirty) {
            password.setIsDirty(true);
        }
        if (isRegistrationMode && !confirmPassword.isDirty) {
            confirmPassword.setIsDirty(true);
        }

        username.onBlur();
        password.onBlur();
        if (isRegistrationMode) {
            confirmPassword.onBlur();
        }

        if (username.inputValid && password.inputValid && (!isRegistrationMode || password.value === confirmPassword.value)) {
            let result;
            if (isRegistrationMode) {

                result = await dispatch(registration({
                    username: usernameState,
                    password: passwordState,
                    confirmPassword: confirmPasswordState
                }));
            } else {

                result = await dispatch(loginByUsername({username: usernameState, password: passwordState}));
            }

            if (result.meta.requestStatus === 'fulfilled') {
                onSuccess();
            }
        } else {
        }
    }, [dispatch, username, password, confirmPassword, isRegistrationMode, onSuccess]);


    const onSubmit = useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            await onLoginClick();
        },
        [onLoginClick]
    );


    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <div className={cls.wrapperloginform}>
                <Text
                    theme={TextTheme.SECONDARY}
                    title={isRegistrationMode
                        ? t('Создайте аккаунт')
                        : t('С возвращением')}
                    size={TextSize.XL}
                    text={isRegistrationMode
                        ? t('Это займет менее 1 минуты')
                        : t('Пожалуйста, введите свои адрес электронной почты и пароль')}
                />
                <div className={cls.TabsWrapper}>
                    <Tabs
                        tabs={typeTabs}
                        value={isRegistrationMode ? 'register' : 'login'}
                        onTabClick={onTabClick}
                        className={classNames(cls.Tabs, {}, [className])}
                    />
                </div>
                <form className={classNames(cls.form, {}, [className])} onSubmit={onSubmit}>
                    {error && <Text text={error} theme={TextTheme.ERROR}/>}

                    <Input
                        placeholder={t('Электронная почта')}
                        type="text"
                        className={cls.input}
                        value={username.value}
                        onChange={username.onChange}
                        onBlur={username.onBlur}
                        theme={usernameInputTheme}
                        icon={MailIcon}
                    />
                    <div className={cls.errorWrapper}>
                        {username.isDirty && !username.inputValid && (
                            <Text
                                text={username.errorText}
                                theme={username.wasBlurred ? TextTheme.ERROR : TextTheme.NOTIFICATION}
                            />
                        )}
                    </div>

                    <Input
                        placeholder={t('Пароль')}
                        type="password"
                        className={cls.input}
                        value={password.value}
                        onChange={password.onChange}
                        onBlur={password.onBlur}
                        theme={passwordInputTheme}
                        icon={passwordIco}
                    />
                    <div className={cls.errorWrapper}>
                        {password.isDirty && !password.inputValid && (
                            <Text
                                text={password.errorText}
                                theme={password.wasBlurred ? TextTheme.ERROR : TextTheme.NOTIFICATION}
                            />
                        )}
                    </div>
                    <>
                        <Input
                            placeholder={t('Подтвердите пароль')}
                            type="password"
                            className={[
                                cls.input,
                                isRegistrationMode ? cls.animateInputVisible : cls.animateInputHidden
                            ].join(' ')}
                            value={confirmPassword.value}
                            onChange={confirmPassword.onChange}
                            onBlur={confirmPassword.onBlur}
                            theme={confirmPasswordInputTheme}
                            icon={passwordIco}
                        />
                        <div className={cls.errorWrapper}>
                            {confirmPassword.isDirty && !confirmPassword.inputValid && (
                                <Text
                                    text={confirmPassword.errorText}
                                    theme={confirmPassword.wasBlurred ? TextTheme.ERROR : TextTheme.NOTIFICATION}
                                />
                            )}
                        </div>
                    </>
                    <Button
                        theme={ButtonTheme.ACCENT}
                        className={cls.authBtn}
                        type="submit"
                        disabled={isButtonDisabled}
                    >
                        {t('Продолжить')}
                    </Button>
                </form>
            </div>

        </DynamicModuleLoader>
    );
};

export default memo(AuthForm);