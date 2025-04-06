import React from 'react';
import * as cls from './TnsModel.module.scss'
import {useTranslation} from "react-i18next";
import Spline from "@splinetool/react-spline";

interface BearProps {
    className?: string;
}

export const TnsModel = ({className}: BearProps) => {

    const {t} = useTranslation();

    return (
        <div className={cls.WrapperModel}>
            <Spline
                scene="https://prod.spline.design/hKJnHBqnhnfirnuU/scene.splinecode"
            />
        </div>
    );
};