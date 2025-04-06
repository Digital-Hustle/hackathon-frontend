import React, {useCallback} from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import * as cls from './EditableProfileCardHeader.module.scss'
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {getUserAuthData} from "entities/User";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {Text} from "shared/ui/Text/Text";
import {Button, ButtonTheme} from "shared/ui/Button/Button";
import {getProfileData} from "../../model/selectors/getProfileData/getProfileData";
import {getProfileReadonly} from "../../model/selectors/getProfileReadonly/getProfileReadonly";
import {profileActions} from "../../model/slice/profileSlice";
import {updateProfileData} from "../../model/services/updateProfileData/updateProfileData";
import {useNavigate} from "react-router-dom";
import {RoutePath} from "shared/const/router";

interface EditableProfileCardHeaderProps {
    className?: string;
}

export const EditableProfileCardHeader = ({className}: EditableProfileCardHeaderProps) => {


    const {t} = useTranslation('profile');
    const authData = useSelector(getUserAuthData);
    const profileData = useSelector(getProfileData);
    const isMyPage = authData?.id === profileData?.id
    const readonly = useSelector(getProfileReadonly)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onEdit = useCallback(() => {
        dispatch(profileActions.setReadonly(false))
    }, [])

    const onCancelEdit = useCallback(() => {
        dispatch(profileActions.cancelEdit())
    }, [dispatch])

    const onSave = useCallback(() => {
        dispatch(updateProfileData())
    }, [dispatch])

    const onChat = useCallback(() => {
        navigate(`${RoutePath.chats_details}}`);
    }, [])

    return (
        <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
            <Text title={t('Профиль')}/>
            {isMyPage ? (
                    <div className={cls.btnWrapper}>
                        {readonly ?
                            (<Button
                                className={cls.editBtn}
                                theme={ButtonTheme.OUTLINE}
                                onClick={onEdit}
                            >
                                {t('Редактировать')}
                            </Button>)
                            :
                            <>
                                <Button
                                    className={cls.editBtn}
                                    theme={ButtonTheme.OUTLINE_RED}
                                    onClick={onCancelEdit}
                                >
                                    {t('Отменить')}
                                </Button>
                                <Button
                                    className={cls.saveBtn}
                                    theme={ButtonTheme.OUTLINE}
                                    onClick={onSave}
                                >
                                    {t('Сохранить')}
                                </Button>
                            </>
                        }
                    </div>
                )
                :
                (
                    <div className={cls.btnWrapper}>
                        <Button
                            className={cls.editBtn}
                            theme={ButtonTheme.OUTLINE}
                            onClick={onChat}
                        >
                            {t('Написать')}
                        </Button>
                    </div>
                )
            }
        </div>
    );
};