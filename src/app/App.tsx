import React, {Suspense, useEffect} from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import {useTheme} from "app/providers/ThemeProvider";
import {AppRouter} from "app/providers/router";
import {Navbar} from "widgets/Navbar";
import {useDispatch, useSelector} from "react-redux";
import {getUserInited, userActions} from "entities/User";
import {useLocation} from 'react-router-dom';

function App() {
    const {theme} = useTheme();
    const dispatch = useDispatch();
    const location = useLocation();
    const noNavbarRoutes = ['/']
    const isNoNavbarRoute = noNavbarRoutes.includes(location.pathname);

    const inited = useSelector(getUserInited);

    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);


    return (
        <div className={classNames('app', {}, [theme])}>
            <Suspense fallback="">
                {!isNoNavbarRoute && <Navbar/>}
                <div className="content-page">
                    {inited && <AppRouter/>}
                </div>
            </Suspense>
        </div>
    );
}

export default App;
