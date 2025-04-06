import ReactDOM from 'react-dom/client';
import App from './app/App';
import {BrowserRouter} from 'react-router-dom';
import React from "react";
import 'app/styles/index.scss'
import {ThemeProvider} from "app/providers/ThemeProvider";
import './shared/config/i18n/i18n';
import {ErrorBoundary} from "app/providers/ErrorBoundary";
import {StoreProvider} from "app/providers/StoreProvider";
import {GoogleOAuthProvider} from "@react-oauth/google";


const googleClientId = __CLIENT_ID_GOOGLE__;

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
    <BrowserRouter>
        <StoreProvider>
            <ErrorBoundary>
                <ThemeProvider>
                    <GoogleOAuthProvider clientId={googleClientId}>
                        <App/>
                    </GoogleOAuthProvider>
                </ThemeProvider>
            </ErrorBoundary>
        </StoreProvider>
    </BrowserRouter>
);
