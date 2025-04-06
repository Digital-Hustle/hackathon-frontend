import React, {memo} from 'react';
import {useTranslation} from "react-i18next";
import * as cls from './MainPage.module.scss'
import {Button, ButtonSize, ButtonTheme} from "shared/ui/Button/Button";
import TnsLogo from "shared/assets/icons/TnsLogoDark.svg"
import {Icon} from "shared/ui/Icon/Icon";
import telegramLogo from "shared/assets/icons/telegramIcon.svg"
import circle from "shared/assets/icons/circle.svg"
import AppLink from "shared/ui/AppLink/AppLink";
import ilustration1 from '../../../shared/assets/image/ilustration1.png';
import ilustration2 from '../../../shared/assets/image/ilustration2.png';
import cloudBig from '../../../shared/assets/image/cloudBig.png';
import cloudSmall from '../../../shared/assets/image/cloudSmall.png';
import secdot from "../../../shared/assets/icons/2dot.svg"
import dotindot from "../../../shared/assets/icons/dotInDot.svg"
import fourtdot from "../../../shared/assets/icons/4dot.svg"
import scrollicon from "../../../shared/assets/icons/scroll.svg"
import shapeIcon from "../../../shared/assets/icons/shape.svg"
import {LOCAL_STORAGE_THEME_KEY} from "app/providers/ThemeProvider/lib/ThemeContext";
import xlsxFile from 'shared/assets/file/tns_template.xlsx';
import {ThemeSwitcher} from "widgets/ThemeSwitcher";
import LangSwitcher from "widgets/LangSwitcher/LangSwitcher";
import {useNavigate} from "react-router-dom";
import {RoutePath} from "shared/const/router";
import {FileLoader} from "features/DownloadFile";


const MainPage = () => {

    const {t} = useTranslation('main');
    const navigate = useNavigate();


    const scrollToBottom = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
        });
    };

    return (
        <div className={cls.page}>
            <Icon
                className={cls.circle3}
                Svg={circle}
            />
            <header className={cls.header}>
                <div className={cls.logoWrapper}>
                    <Icon Svg={TnsLogo} className={cls.LogoTnsColor}/>
                </div>
                <div className={cls.itemsWrapper}>
                    <ThemeSwitcher className={cls.themeSwitcher}/>
                    <LangSwitcher className={cls.langSwitcher}/>
                    <Button
                        size={ButtonSize.XL}
                        className={cls.loginBtn}
                        theme={ButtonTheme.ACCENT}
                        onClick={() => navigate(RoutePath.auth)}
                    >
                        {t('Войти в аккаунт')}
                    </Button>
                </div>
            </header>
            <section className={cls.hero}>
                <div className={cls.content}>
                    <h1 className={cls.title}>
                        {t('Экономьте')}<br/>
                        {t('как')}<br/>
                        <span className={cls.underline}>{t('никогда')}</span><br/>
                        {t('раньше')}
                    </h1>
                    <p className={cls.description}>
                        {t('Быстро рассчитайте нужные и максимально выгодные тарифы. Прощай волокита! 👋')}
                    </p>
                    <div className={cls.buttons}>
                        <Button
                            className={cls.btncalc}
                            size={ButtonSize.XL}
                            theme={ButtonTheme.ACCENT}
                            onClick={scrollToBottom}
                        >
                            {t('Произвести расчет')}
                        </Button>
                        <AppLink
                            to={'http://t.me/tnsenergo_robot'}
                            target={'_blank'}
                            className={cls.linkss}
                        >
                            <Icon Svg={telegramLogo}/>
                            {t('или рассчитать в Telegram')}
                        </AppLink>
                    </div>
                    <div className={cls.scrollIndicator}>
                        <Icon
                            className={cls.scrollIco}
                            Svg={scrollicon}
                        />
                        {t('Листайте ниже, чтобы узнать больше')}
                    </div>
                </div>
                <div className={cls.imageWrapper}>
                    <img
                        className={cls.image}
                        src={ilustration1} alt=""/>
                </div>
                <Icon
                    className={cls.circle1}
                    Svg={circle}
                />
                <Icon
                    className={cls.circle2}
                    Svg={circle}
                />
            </section>
            <section className={cls.hero}>
                <div className={cls.contentColumn}>
                    <div className={cls.TextBlock}>
                        <p className={cls.blueText}>
                            {t('Сервис для определения оптимальной ценовой категории')}
                        </p>
                        <h1 className={cls.title}>
                            {t('Как это')}<br/>
                            {t('работает')} <span className={cls.question}>?</span> <br/>
                        </h1>
                        <p className={cls.greyText}>
                            {t('Предложим подходящий для Вас тариф. Экономьте миллионы.')}
                            </p>
                    </div>
                    <div className={cls.instruction}>
                        <div className={cls.instructionItem}>
                            <Icon
                                className={cls.dote}
                                Svg={fourtdot}
                            />
                            <p className={cls.textInstruction}>
                                {t('Вы загружаете файл с вашим деталями потреблением электроэнергии')}
                                </p>
                        </div>
                        <div className={cls.instructionItem}>
                            <Icon
                                className={cls.dote}
                                Svg={dotindot}
                            />
                            <p className={cls.textInstruction}>
                                {t('Мы рассчитываем и предлагаем для Вас наиболее выгодный тариф')}
                                </p>
                        </div>
                        <div className={cls.instructionItem}>
                            <Icon
                                className={cls.dote}
                                Svg={secdot}
                            />
                            <p className={cls.textInstruction}>
                                {t('Вы можете войти в свой личный кабинет для сохранения рассчетов')}
                                </p>
                        </div>
                    </div>
                </div>
                <div className={cls.imageWrapper}>
                    <img
                        className={cls.image}
                        src={ilustration2} alt=""
                    />
                </div>
                <Icon
                    className={cls.circle4}
                    Svg={circle}
                />
            </section>
            <section className={cls.lastSection}>
                <div className={cls.wrapperClouds}>
                    <div className={cls.cloudBig}>
                        <img src={cloudBig} alt="Облако большое"/>
                    </div>
                    <FileLoader className={cls.fileInput}/>
                    <div className={cls.cloudSmall}>
                        <img src={cloudSmall} alt="Облако маленькое"/>
                    </div>
                </div>

                <Button
                    size={ButtonSize.XL}
                    className={cls.downloadBtn}
                    theme={ButtonTheme.ACCENT}
                >
                    <a
                        href={xlsxFile}
                        download="template.xlsx"
                        className={cls.downloadLink}
                    >
                        <Icon className={cls.shapeIcon} Svg={shapeIcon}/>
                        {t('Скачать шаблон')}
                    </a>
                </Button>
                <Icon
                    className={cls.circlegre1}
                    Svg={circle}
                />
                <Icon
                    className={cls.circlegre2}
                    Svg={circle}
                />
                <Icon
                    className={cls.circlegre3}
                    Svg={circle}
                />
                <Icon
                    className={cls.circlegre4}
                    Svg={circle}
                />
            </section>
        </div>
    );
};

export default memo(MainPage);