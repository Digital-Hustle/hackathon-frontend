import React, {memo} from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import * as cls from "./LangSwitcher.module.scss"
import {useTranslation} from "react-i18next";
import {Button, ButtonTheme} from "shared/ui/Button/Button";
import globalIcon from "shared/assets/icons/globe.svg";
import {Icon} from "shared/ui/Icon/Icon";


interface LangSwitcherProps {
    className?: string;
    short?: boolean;
}

const LangSwitcher = memo(({className, short}: LangSwitcherProps) => {

    const {t, i18n} = useTranslation();

    const toggle = async () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    }

    return (
        <Button
            className={classNames(cls.langSwitcher, {}, [className])}
            theme={ButtonTheme.CLEAR}
            onClick={toggle}
        >
            <Icon
                className={cls.langSwitcherIco}
                Svg={globalIcon} />
        </Button>
    );
});

export default LangSwitcher;