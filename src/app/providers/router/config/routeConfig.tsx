import { AppRoutes, RoutePath } from "shared/const/router";
import { AppRoutesProps } from "shared/types/router";
import { AboutPage } from "pages/AboutPage";
import { MainPage } from "pages/MainPage";
import { NotFoundPage } from "pages/NotFoundPage";
import { ProfilePage } from "pages/ProfilePage";
import {AuthPage} from "pages/AuthPage";
import React from "react";
import {ChatsPage} from "pages/ChatsPage";
import {ChatDetailsPage} from "pages/ChatDetailsPage";


export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
    },
    [AppRoutes.ABOUT]: {
        path: RoutePath.about,
        element: <AboutPage />,
    },
    [AppRoutes.AUTH]: {
        path: RoutePath.auth,
        element: <AuthPage />,
    },
    [AppRoutes.PROFILE]: {
        path: `${RoutePath.profile}:id`,
        element: <ProfilePage />,
        authOnly: true,
    },
    [AppRoutes.CHATS]: {
        path: RoutePath.chats,
        element: <ChatsPage />,
        authOnly: true,
    },
    [AppRoutes.CHATS_DETAILS]: {
        path: `${RoutePath.chats_details}:id`,
        element: <ChatDetailsPage />,
        authOnly: true,
    },
    // last
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
};