import React, {useCallback, useEffect} from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import {useTranslation} from "react-i18next";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {useSelector} from "react-redux";
import {Text, TextTheme} from "shared/ui/Text/Text";
import {getProfileForm} from "../../model/selectors/getProfileForm/getProfileForm";
import {getProfileError} from "../../model/selectors/getProfileError/getProfileError";
import {
    getProfileIsLoading
} from "../../model/selectors/getProfileIsLoading/getProfileIsLoading";
import {
    getProfileValidateErrors
} from "../../model/selectors/getProfileValidateErrors/getProfileValidateErrors";
import {getProfileReadonly} from "../../model/selectors/getProfileReadonly/getProfileReadonly";
import {ValidateProfileError} from "../../model/types/editableProfileCardSchema";
import {fetchProfileData} from "../../model/services/fetchProfileData/fetchProfileData";
import {profileActions, profileReducer} from "../../model/slice/profileSlice";
import {ProfileCard} from "entities/Profile";
import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {
    EditableProfileCardHeader
} from "../../ui/EditableProfileCardHeader/EditableProfileCardHeader";


interface EditableProfileCardProps {
    className?: string;
    id: string;
}

const reducers: ReducersList = {
    profile: profileReducer,
}

export const EditableProfileCard = ({className, id}: EditableProfileCardProps) => {

    const {t} = useTranslation('profile');
    const dispatch = useAppDispatch();
    const formData = useSelector(getProfileForm);
    const error = useSelector(getProfileError);
    const isLoading = useSelector(getProfileIsLoading);
    const readonly = useSelector(getProfileReadonly);
    const validateErros = useSelector(getProfileValidateErrors)

    const validateErrorTranslates = {
        [ValidateProfileError.SERVER_ERROR]: t('Серверная ошибка при сохранении'),
        [ValidateProfileError.INCORRECT_USER_AGE]: t('Некорректный возраст'),
        [ValidateProfileError.NO_DATA]: t('Данные не указаны'),
        [ValidateProfileError.INCORRECT_COUNTRY]: t('Некорректный страна'),
        [ValidateProfileError.INCORRECT_USER_DATA]: t('Имя и фамилия не указаны'),
    }

    useEffect(() => {
        if (id) {
            dispatch(fetchProfileData(id));
        }
    },[dispatch,id])

    const onChangeFirstname = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({name: value || ''}))
    },[dispatch])


    const onChangeAge = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({age: Number(value || 0) }))
    },[dispatch])

    const onChangeDescription = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({description: value || ''}))
    },[dispatch])


    return (
        <DynamicModuleLoader reducers={reducers} >
            <div className={classNames('', {}, [className])}>
                <EditableProfileCardHeader />
                {validateErros?.length && validateErros.map(err => (
                    <Text key={err} theme={TextTheme.ERROR} text={validateErrorTranslates[err]}/>
                ))}
                <ProfileCard
                    data={formData}
                    isLoading={isLoading}
                    error={error}
                    onChangeFirstname={onChangeFirstname}
                    onChangeAge={onChangeAge}
                    onChangeDescription={onChangeDescription}
                    // onChangeAvatar={onChangeAvatar}
                    readonly={readonly}
                />
            </div>
        </DynamicModuleLoader>

    );
};