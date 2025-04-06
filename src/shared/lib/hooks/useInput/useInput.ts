import React, {useState} from "react";
import {useValidation, ValidationOptions, ValidationState} from "../useValidation/useValidation";

export interface InputState extends ValidationState {
    value: string;
    onChange: (value: string) => void;
    onBlur: () => void;
    isDirty: boolean;
    wasBlurred: boolean;
    setIsDirty: React.Dispatch<React.SetStateAction<boolean>>;
    errorText: string;
}

export const useInput = (initialValue: string, validations: ValidationOptions, handleChange: (value: string) => void ): InputState => {
    const [value, setValue] = useState(initialValue);
    const [isDirty, setIsDirty] = useState(false);
    const [wasBlurred, setWasBlurred] = useState(false);

    const {
        isEmpty,
        minLengthError,
        maxLengthError,
        emailError,
        inputValid,
        errorText,
        matchError,
    } = useValidation(value, validations);


    const onChange = (newValue: string) => {
        setValue(newValue);

        if (!isDirty) {
            setIsDirty(true);
        }
        handleChange(newValue)
    };

    const onBlur = () => {
        setWasBlurred(true);
    };

    return {
        value,
        onChange,
        onBlur,
        isDirty,
        setIsDirty,
        wasBlurred,
        isEmpty,
        minLengthError,
        maxLengthError,
        emailError,
        inputValid,
        matchError,
        errorText,
    };
};