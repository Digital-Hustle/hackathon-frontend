import React, {FC, InputHTMLAttributes, memo, SVGProps, useEffect, useRef, useState} from 'react';
import {classNames, Mods} from "../../lib/classNames/classNames";
import * as cls from './Input.module.scss'
import {Icon} from "shared/ui/Icon/Icon";

export enum InputTheme {
    ERROR = "error",
    DONE = "done",
    CLEAR = "clear",
    NOTIFICATION = "notification",
    CLEAR__INVERTED = "clearInverted",
    OUTLINE = "outline",
    OUTLINE_RED = "outline_red",
    BACKGROUND = "background",
    BACKGROUND_INVERTED = "backgroundInverted",
}


type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>

interface InputProps extends HTMLInputProps {
    className?: string;
    theme ?: InputTheme;
    value?: string | number;
    onChange?: (value: string) => void;
    autofocus?: boolean;
    readonly?: boolean;
    onBlur?: () => void;
    icon?: FC<SVGProps<SVGElement>>;
}

export const Input = memo((props: InputProps) => {
    const {
        className,
        value,
        theme=InputTheme.CLEAR,
        onChange,
        type = 'text',
        placeholder,
        autofocus,
        readonly,
        onBlur,
        icon,
        ...otherProps
    } = props;
    const ref = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [caretPosition, setCaretPosition] = useState(0);

    const isCaretVisible = isFocused && !readonly;

    useEffect(() => {
        if (autofocus) {
            setIsFocused(true);
            ref.current?.focus();
        }
    }, [autofocus]);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
        setCaretPosition(e.target.value.length);
    };

    const handleBlur = () => {
        setIsFocused(false);
        onBlur?.();
    };

    const onFocus = () => {
        setIsFocused(true);
    };

    const onSelect = (e: any) => {
        setCaretPosition(e?.target?.selectionStart || 0);
    };

    const mods: Mods = {
        [cls.readonly]: readonly,
    };

    return (
        <div className={classNames(cls.InputWrapper, mods, [className])}>
            <div
                className={classNames(cls.inputContainer, mods, [cls[theme]])}
            >
                {icon && <Icon Svg={icon} className={cls.icon} />}
                <input
                    className={classNames(cls.input, mods, [])}
                    placeholder={placeholder}
                    readOnly={readonly}
                    value={value}
                    onChange={onChangeHandler}
                    onBlur={handleBlur}
                />
            </div>
        </div>
    );
});