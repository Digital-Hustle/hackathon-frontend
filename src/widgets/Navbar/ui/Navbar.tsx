import React, {memo, useCallback, useState} from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import * as cls from "./Navbar.module.scss"
import {useTranslation} from "react-i18next";
import {getUserAuthData, userActions} from "entities/User";
import {useDispatch, useSelector} from "react-redux";
import {Text, TextSize, TextTheme} from "shared/ui/Text/Text"
import AppLink, {AppLinkTheme} from "shared/ui/AppLink/AppLink";
import {RoutePath} from "shared/const/router";
import {DropDown} from "shared/ui/DropDown/DropDown";
import {Avatar} from "shared/ui/Avatar/Avatar";
import {getProfileData} from "features/EditableProfileCard/model/selectors/getProfileData/getProfileData";
import {
    getProfileIsLoading
} from "features/EditableProfileCard/model/selectors/getProfileIsLoading/getProfileIsLoading";
import {Loader} from "shared/ui/Loader/Loader";
import {Icon} from "shared/ui/Icon/Icon";
import {ThemeSwitcher} from "widgets/ThemeSwitcher";
import LangSwitcher from "widgets/LangSwitcher/LangSwitcher";
import {Button, ButtonSize, ButtonTheme} from "shared/ui/Button/Button";
import {LOCAL_STORAGE_THEME_KEY} from "app/providers/ThemeProvider/lib/ThemeContext";
import TnsLogo from "shared/assets/icons/TnsLogoDark.svg";


interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({className}: NavbarProps) => {

    const {t} = useTranslation();

    const authData = useSelector(getUserAuthData)
    const profileData = useSelector(getProfileData)
    const isProfileLoading = useSelector(getProfileIsLoading)
    const dispatch = useDispatch();


    const onLogout = useCallback(() => {
        dispatch(userActions.logout())
    }, [dispatch])

    if (authData) {
        if (isProfileLoading) {
            return (
                <header className={classNames(cls.navbar, {}, [className])}>
                    <AppLink
                        className={cls.appName}
                        to={RoutePath.main}
                        theme={AppLinkTheme.PRIMARY}
                    >
                        <Icon Svg={TnsLogo} className={cls.LogoTnsColor}/>
                        <div className={cls.switcherWrapper}>
                            <ThemeSwitcher className={cls.themeSwitcher}/>
                            <LangSwitcher className={cls.langSwitcher}/>
                        </div>
                    </AppLink>
                </header>
            )
        }
        return (
            <header className={classNames(cls.navbar, {}, [className])}>
            <AppLink
                    className={cls.appName}
                    to={RoutePath.main}
                    theme={AppLinkTheme.PRIMARY}
                >
                    <Icon Svg={TnsLogo} className={cls.LogoTnsColor}/>
                </AppLink>
                <div className={cls.switcherWrapper}>
                    <ThemeSwitcher className={cls.themeSwitcher}/>
                    <LangSwitcher className={cls.langSwitcher} />
                </div>
                <DropDown
                    direction='bottom left'
                    className={cls.dropdown}
                    items={[
                        {
                            content: t('Профиль'),
                            href: RoutePath.profile + authData.id,
                        },
                        {
                            content: t('Выйти'),
                            onClick: onLogout,
                        }
                    ]}
                    trigger={<Avatar size={30} src={`data:image/jpeg;base64,${profileData?.photo}`}/>}
                />
            </header>
        )
    }

    return (
        <header className={classNames(cls.navbar, {}, [className])}>
            <AppLink
                className={cls.appName}
                to={RoutePath.main}
                theme={AppLinkTheme.PRIMARY}
            >
                <Icon Svg={TnsLogo} className={cls.LogoTnsColor}/>
            </AppLink>
            <div className={cls.switcherWrapper}>
                <ThemeSwitcher className={cls.themeSwitcher}/>
                <LangSwitcher className={cls.langSwitcher}/>
            </div>
        </header>
    );
});
