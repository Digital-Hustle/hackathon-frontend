import React, {memo} from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import * as cls from './Message.module.scss'
import {useTranslation} from "react-i18next";
import {Text, TextSize} from "../Text/Text"


export enum MessageTheme {
    ANOTHER = "another",
    YOUR = "your",
}

interface MessageProps {
    className?: string;
    theme ?: MessageTheme;
    text ?: string;
}

export const Message = memo((props: MessageProps) => {

    const {
        className,
        theme = MessageTheme.YOUR,
        text= 'pososi',
    } = props;

    const {t} = useTranslation();

    return (
        <div className={classNames(cls.Message, {}, [className, cls[theme]])}>
            <Text
                size={TextSize.M}
                text={text}
            />
        </div>
    );
});