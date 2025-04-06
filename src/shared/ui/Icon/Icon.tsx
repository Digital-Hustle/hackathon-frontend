import React, {FC, SVGProps} from 'react';
import {classNames} from "../../lib/classNames/classNames";
import * as cls from './Icon.module.scss'

interface IconProps extends SVGProps<SVGSVGElement> {
    className?: string;
    Svg: FC<SVGProps<SVGElement>>;
}

export const Icon = (props: IconProps) => {

    const {
        className,
        Svg,
        ...otherProps
    } = props

    return (
        <Svg
            className={classNames(cls.Icon, {}, [className])}
            {...otherProps}
        />
    );
};