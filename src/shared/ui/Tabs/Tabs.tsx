import React, {memo, ReactNode, useCallback, useState} from 'react';
import {classNames} from "../../lib/classNames/classNames";
import * as cls from './Tabs.module.scss'
import {Button, ButtonTheme} from "shared/ui/Button/Button";


export interface TabItem {
    value: string;
    content: ReactNode;
}

interface TabsProps {
    className?: string;
    tabs: TabItem[];
    value: string;
    onTabClick: (tab: TabItem) => void;
}

export const Tabs = memo((props: TabsProps) => {
    const {
        className, tabs, onTabClick, value,
    } = props;



    const [currentTab, setCurrentTab] = useState<TabItem>();

    const clickHandle = useCallback((tab: TabItem) => () => {
        setCurrentTab(tab);
        onTabClick(tab);
    }, [onTabClick]);

    const currentTabIndex = currentTab ? tabs.findIndex(tab => tab.value === currentTab.value) : 0;

    return (
        <div className={classNames(cls.Tabs, {}, [className])}>
            {tabs.map((tab) => (
                <Button
                    className={cls.tabItem}
                    theme={ButtonTheme.CLEAR}
                    key={tab.value}
                    onClick={clickHandle(tab)}
                >
                    {tab.content}
                </Button>
            ))}
            <div
                className={cls.tabActiveItem}
                style={{
                    transform: `translateX(${currentTabIndex * 10}rem)`,
                }}
            />
        </div>
    );
});