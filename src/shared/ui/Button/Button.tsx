import React, {ButtonHTMLAttributes, FC, memo, ReactNode} from 'react';
import {classNames, Mods} from "../../lib/classNames/classNames";
import * as cls from './Button.module.scss'

export enum ButtonTheme {
    ACCENT = "accent",
    MAIN = "main",
    TRANSPARENT = "transparent",
    CLEAR = "clear",
    CLEAR__INVERTED = "clearInverted",
    OUTLINE = "outline",
    OUTLINE_RED = "outline_red",
    BACKGROUND = "background",
    BACKGROUND_INVERTED = "backgroundInverted",
}

export enum ButtonSize {
    S ='size_s',
    M = 'size_m',
    L = 'size_l',
    XL = 'size_xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme ?: ButtonTheme;
    square ?: boolean;
    size ?: ButtonSize;
    disabled?: boolean;
    children?: ReactNode;
}


export const Button: FC<ButtonProps> = memo((props) => {

    const {
        className,
        children,
        theme = ButtonTheme.OUTLINE,
        square,
        disabled,
        size = ButtonSize.M,
        ...otherProps
    } = props;

    const mods: Mods = {
        [cls.square]: square,
        [cls.disabled]: disabled,
    }

    return (
        <button
            className={classNames(cls.Button, mods,[className, cls[theme], cls[size]])}
            disabled={disabled}
            {...otherProps}
        >
            {children}
        </button>
    );
});