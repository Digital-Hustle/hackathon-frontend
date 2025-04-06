import {createSelector} from "@reduxjs/toolkit";
import {getUserAuthData} from "entities/User";
import {RoutePath} from "shared/const/router";
import MainIcon from "shared/assets/icons/main-20-20.svg";
import AboutIcon from "shared/assets/icons/about-20-20.svg";
import ProfileIcon from "shared/assets/icons/Profile-20-20.svg";
import ChatIcon from "shared/assets/icons/Chat-Icon.svg";

import {SidebarItemType} from "../../model/types/sidebar";

export const getSidebarItems = createSelector(
    getUserAuthData,
    (userData) => {
        const sidebarItemsList: SidebarItemType[] = [
            {
                path: RoutePath.main,
                Icon: MainIcon,
                text: 'Главная',
            },
            {
                path: RoutePath.about,
                Icon: AboutIcon,
                text: 'О сайте',
            },
        ];

        if (userData) {
            sidebarItemsList.push(
                {
                    path: RoutePath.profile + userData.id,
                    Icon: ProfileIcon,
                    text: 'Профиль',
                    authOnly: true,
                },
                {
                    path: RoutePath.chats,
                    Icon: ChatIcon,
                    text: 'Чаты',
                    authOnly: true,
                },
            );
        }

        return sidebarItemsList;
    }
)