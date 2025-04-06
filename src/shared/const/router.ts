export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    AUTH = 'auth',
    PROFILE = 'profile',
    CHATS = 'chats',
    CHATS_DETAILS = 'chats_details',
    // last
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.AUTH]: '/auth',
    [AppRoutes.PROFILE]: '/profile/', // + :id
    [AppRoutes.CHATS]: '/chats',
    [AppRoutes.CHATS_DETAILS]: '/chats/',  // + :id
    // последний
    [AppRoutes.NOT_FOUND]: '*',
};