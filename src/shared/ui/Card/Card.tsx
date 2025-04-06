import React, {HTMLAttributes} from 'react';
import {classNames} from "../../lib/classNames/classNames";
import * as cls from './Card.module.scss'

export enum CardTheme {
    NORMAL = 'normal',
    OUTLINED = 'outlined'
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children?: React.ReactNode;
    theme?: CardTheme;
}

export const Card = ({className, children, theme= CardTheme.NORMAL, ...otherprops}: CardProps) => {


    return (
        <div className={classNames(cls.Card, {}, [className, cls[theme]])} {...otherprops}>
            {children}
        </div>
    );
};