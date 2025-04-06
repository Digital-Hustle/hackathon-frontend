import React, {memo, RefObject, UIEvent, useEffect, useRef} from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import * as cls from './Page.module.scss'
import {useTranslation} from "react-i18next";
import {useInfiniteScroll} from "shared/lib/hooks/useInfiniteScroll/useInfiniteScroll";
import {useSelector} from "react-redux";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {getScrollSaveByPath, ScrollSaveActions} from "./ScrollSave";
import {useLocation} from "react-router-dom";
import {StateSchema} from "app/providers/StoreProvider";
import {useThrottle} from "shared/lib/hooks/useThrottle/useThrottle";

interface PageProps {
    className?: string;
    children?: React.ReactNode;
    onScrollEnd?: () => void;
}

export const Page = memo(({className, children, onScrollEnd}: PageProps) => {

    const {t} = useTranslation();
    const wrapperRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();
    const {pathname} = useLocation();
    const scrollPosition = useSelector((state: StateSchema) => getScrollSaveByPath(state, pathname))

    useInfiniteScroll( {
        triggerRef: triggerRef as RefObject<HTMLDivElement>,
        wrapperRef: wrapperRef as RefObject<HTMLDivElement>,
        callback: onScrollEnd,
    })

    useEffect(() => {
        if (wrapperRef.current) {
            wrapperRef.current.scrollTop = scrollPosition || 0;
        }
    }, [scrollPosition]);

    const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
        dispatch(ScrollSaveActions.setScrollPosition({
            position: e.currentTarget.scrollTop,
            path: pathname,
        }));
    }, 500);

    return (
        <main
            ref={wrapperRef}
            className={classNames(cls.Page, {}, [className])}
            onScroll={onScroll}
        >
            {children}
            {onScrollEnd ? <div className={cls.trigger} ref={triggerRef} /> : null}
        </main>
    );
})