import React, {memo} from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import * as cls from "./ThemeSwitcher.module.scss"
import {Theme, useTheme} from "app/providers/ThemeProvider";
import {Button, ButtonTheme} from "shared/ui/Button/Button";
import sunIcon from 'shared/assets/icons/sun.svg';
import moonIcon from 'shared/assets/icons/moon.svg';
import {Icon} from "shared/ui/Icon/Icon";



interface ThemeSwitcherProps {
    className?: string;
}
const ThemeSwitcher = memo(({className}: ThemeSwitcherProps) => {

    const {theme , toggleTheme} = useTheme();

    return (
        <Button
            theme={ButtonTheme.CLEAR}
            className={classNames(cls.ThemeSwitcher, {}, [className])}
            onClick={toggleTheme}>
            {theme === Theme.DARK ? <Icon
                className={cls.icon}
                    Svg={moonIcon}/>
                :
                <Icon
                    className={cls.icon}
                    Svg={sunIcon}/>}
        </Button>
    );
});

export default ThemeSwitcher;