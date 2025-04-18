import React, {memo} from 'react';
import * as cls from './SidebarItem.module.scss'
import {useTranslation} from "react-i18next";
import AppLink, {AppLinkTheme} from "shared/ui/AppLink/AppLink";
import {classNames} from "shared/lib/classNames/classNames";
import {SidebarItemType} from "../../model/types/sidebar";

interface SidebarItemProps {
    item: SidebarItemType;
    collapsed: boolean;
}

export const SidebarItem = memo(({item , collapsed}: SidebarItemProps) => {

    const {t} = useTranslation();

    // const isAuth = useSelector(getUserAuthData)
    const isAuth = true;

    if(item.authOnly && !isAuth) {
        return null;
    }

    return (
        <AppLink
            theme={AppLinkTheme.PRIMARY}
            to={item.path}
            className={classNames(cls.item, {[cls.collapsed]: collapsed})}
        >
            <item.Icon className={cls.icon}/>
            <span className={cls.link}>{t(item.text)}</span>
        </AppLink>
    );
});
