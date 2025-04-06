import React, {FC, memo} from 'react';
import {classNames} from "../../lib/classNames/classNames";
import * as cls from './AppLink.module.scss'
import {Link, LinkProps} from "react-router-dom";


export enum AppLinkTheme {
    PRIMARY = 'primary',
}

interface AppLinkProps extends LinkProps {
    className?: string;
    theme?: AppLinkTheme;
    children?: React.ReactNode;
}

export const AppLink: FC<AppLinkProps> = memo((props) => {

    const {
        to,
        className,
        children,
        theme = AppLinkTheme.PRIMARY,
        ...otherProps
    } = props;
    return (
        <Link
            to={to}
            className={classNames(cls.AppLink, {} ,[className, cls[theme]])}
            {...otherProps}
        >
            {children}
        </Link>
    );
});

export default AppLink;