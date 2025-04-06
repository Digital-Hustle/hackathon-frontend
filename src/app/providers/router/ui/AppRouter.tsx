import React, {memo, Suspense, useCallback} from 'react';
import {Route, Routes} from "react-router-dom";
import {PageLoader} from 'shared/ui/PageLoader/PageLoader'
import {RequireAuth} from "app/providers/router/ui/RequireAuth";
import {routeConfig} from "app/providers/router/config/routeConfig";
import {AppRoutesProps} from "shared/types/router";

const AppRouter = () => {

    const renderWithWrapper = useCallback((route: AppRoutesProps) => {

        const element = (
            <Suspense fallback={<PageLoader/>}>
                {route.element}
            </Suspense>
        )

        return (
            <Route
                key={route.path}
                path={route.path}
                element={route.authOnly ? <RequireAuth>{element}</RequireAuth> : element}
            />
        )
    },[])

    return (
        <Routes>
            {Object.values(routeConfig).map(renderWithWrapper)}
        </Routes>
    )
};

export default memo(AppRouter);