import React, { useRef, } from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import * as cls from './ProfileCard.module.scss'
import {useTranslation} from "react-i18next";
import {Text, TextAlign, TextTheme} from "shared/ui/Text/Text";
import {Input} from "shared/ui/Input/Input";
import {IProfile} from "../../model/types/IProfile"
import {Loader} from "shared/ui/Loader/Loader";
import {Avatar} from "shared/ui/Avatar/Avatar";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {updateProfilePhoto} from "features/EditableProfileCard/model/services/updateProfilePhoto/updateProfilePhoto";


interface ProfileCardProps {
    className?: string;
    data?: IProfile;
    error?: string;
    isLoading?: boolean;
    readonly?: boolean;
    onChangeLastname?: (value?: string) => void;
    onChangeFirstname?: (value?: string) => void;
    onChangeCity?: (value?: string) => void;
    onChangeAge?: (value?: string) => void;
    onChangeUsername?: (value?: string) => void;
    onChangeAvatar?: (value?: string) => void;
    onChangeDescription?: (value?: string) => void;
}


export const ProfileCard = (props: ProfileCardProps) => {
    const {
        className,
        data,
        error,
        readonly,
        isLoading,
        onChangeFirstname,
        onChangeAge,
        onChangeDescription,
    } = props
    const {t} = useTranslation('profile');
    const dispatch = useAppDispatch();

    const fileInputRef = useRef<HTMLInputElement>(null);
    //
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const photoData = new FormData();
        photoData.append("file", file);

        dispatch(updateProfilePhoto(photoData));
    };

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    if (isLoading) {
        return (
            <div className={classNames(cls.ProfileCard, {[cls.loading]: true}, [className])}>
                <Loader/>
            </div>
        );
    }

    if (error) {
        return (
            <div className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
                <Text
                    theme={TextTheme.ERROR}
                    title={t('Произошла ошибка при загрузке профиля')}
                    text={t('Попробуйте обновить страницу')}
                    align={TextAlign.CENTER}
                />
            </div>
        );
    }

    const mods: Mods = {
        [cls.editing]: !readonly,
    };

    return (
        <div className={classNames(cls.ProfileCard, mods, [className])}>
            <div className={cls.avatarWrapper}>
                <Avatar
                    src={`data:image/jpeg;base64,${data?.photo}`}
                    onClick={handleAvatarClick}
                    className={cls.ava}
                />
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{display: 'none'}}
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={readonly}
                />
            </div>
            <Input
                value={data?.name ?? ''}
                placeholder={t('Ваше имя')}
                className={cls.input}
                onChange={onChangeFirstname}
                readonly={readonly}
            />
            <Input
                value={data?.age ?? ''}
                placeholder={t('Ваш возраст')}
                className={cls.input}
                onChange={onChangeAge}
                readonly={readonly}
            />
            <Input
                value={data?.description ?? ''}
                placeholder={t('Описание')}
                className={cls.input}
                onChange={onChangeDescription}
                readonly={readonly}
            />
        </div>
    );
};