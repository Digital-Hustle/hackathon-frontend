import React, {ChangeEvent, memo, useMemo} from 'react';
import {classNames, Mods} from "../../lib/classNames/classNames";
import * as cls from './Select.module.scss'


export interface SelectOption<T extends string> {
    value: T;
    content: string;
}

interface SelectProps<T extends string> {
    className?: string;
    label?: string;
    options?: SelectOption<T>[];
    value?: T;
    onChange?: (value: T) => void;
    readonly?: boolean;
}

export const Select = <T extends string>(props: SelectProps<T>) => {

    const {
        className,
        label,
        options,
        value,
        onChange,
        readonly
    } = props

    const optionList = useMemo(() => {
        return options?.map((opt) => (
            <option
                className={cls.option}
                value={opt.value}
                key={opt.value}
            >
                {opt.content}
            </option>
        ))
    },[options])

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        if (onChange) {
            onChange(e.target.value as T);
        }
    }

    const mods: Mods = {

    }


    return (
        <div className={classNames(cls.Wrapper, mods ,[className])}>
            {label && <span className={cls.label}>
                {label + '>'}
            </span>}
            <select className={cls.select}
                    onChange={onChangeHandler}
                    value={value}
                    disabled={readonly}
            >
                {optionList}
            </select>
        </div>
    );
};
