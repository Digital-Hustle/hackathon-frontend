import {useEffect, useState} from "react";

export interface ValidationOptions {
    minlength?: number;
    maxlength?: number;
    isEmpty?: boolean;
    isEmail?: boolean;
    match?: string;
}

export interface ValidationState {
    isEmpty: boolean;
    minLengthError: boolean;
    maxLengthError: boolean;
    emailError: boolean;
    inputValid: boolean;
    errorText: string;
    matchError: boolean;
}

export const useValidation = (value: string, validations: ValidationOptions): ValidationState => {
    const [isEmpty, setIsEmpty] = useState(true);
    const [minLengthError, setMinLengthError] = useState(false);
    const [maxLengthError, setMaxLengthError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [inputValid, setInputValid] = useState(false);
    const [matchError, setMatchError] = useState(false);

    const getErrorText = () => {
        if (isEmpty) return 'Поле не должно быть пустым';
        if (minLengthError) return `Минимальная длина пароля ${validations.minlength} символов`;
        if (maxLengthError) return `Максимальная длина не должна превышать ${validations.maxlength} символов`;
        if (emailError) return 'Неверный формат электронной почты';
        if (matchError) return 'Пароли не совпадают';
        return '';
    };

    useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
                case 'minlength':
                    value.length < (validations[validation] as number)
                        ? setMinLengthError(true)
                        : setMinLengthError(false);
                    break;
                case 'maxlength':
                    value.length > (validations[validation] as number)
                        ? setMaxLengthError(true)
                        : setMaxLengthError(false);
                    break;
                case 'isEmpty':
                    value.trim() === '' ? setIsEmpty(true) : setIsEmpty(false);
                    break;
                case 'isEmail':
                    const emailRegex = /\S+@\S+\.\S+/;
                    emailRegex.test(value) ? setEmailError(false) : setEmailError(true);
                    break;
                case 'match':
                    if (validations[validation] !== undefined && value !== validations[validation]) {
                        setMatchError(true);
                    } else {
                        setMatchError(false);
                    }
                    break;
            }
        }

        if (isEmpty || minLengthError || maxLengthError || emailError || matchError) { // Добавьте matchError
            setInputValid(false);
        } else {
            setInputValid(true);
        }
    }, [value, validations, isEmpty, minLengthError, maxLengthError, emailError]);

    return {
        isEmpty,
        minLengthError,
        maxLengthError,
        emailError,
        matchError,
        inputValid,
        errorText: getErrorText(),
    };
};