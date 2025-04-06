import React, {CSSProperties, useMemo} from 'react';
import {classNames, Mods} from "../../lib/classNames/classNames";
import * as cls from './Avatar.module.scss'
import {AppImage} from "../AppImage";
import {Skeleton} from "../Skeleton/Skeleton";
import UserIcon from "../../assets/icons/user-32-32.svg"
import {Icon} from "../Icon/Icon";

interface AvatarProps {
    className?: string;
    src?: string;
    size?: number;
    alt?: string;
    onClick?: () => void;
}

export const Avatar = ({className, src, size = 100, alt, onClick}: AvatarProps) => {

    const mods: Mods = {
    }


    const styles = useMemo<CSSProperties>(() => {
        return {
            width: size,
            height: size,
        }
    },[size])

    const fallback= <Skeleton width={size} height={size} border="50%" />
    const errorFallback = <Icon onClick={onClick} width={size} height={size} Svg={UserIcon} />


    return (
        <AppImage
            onClick={onClick}
            fallback={fallback}
            errorFallback={errorFallback}
            src={src}
            style={styles}
            alt={alt}
            className={classNames(cls.Avatar, mods ,[className])}
        />
    );
};
