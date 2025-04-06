
import {IProfile} from "entities/Profile";
import {ValidateProfileError} from "../../../model/types/editableProfileCardSchema";

export const validateProfile = (profile?: IProfile) => {

    if (!profile) {
        return [ValidateProfileError.NO_DATA]
    }

    const {name, age} = profile;
    const errors: ValidateProfileError[] = [];
    if (!name) {
        errors.push(ValidateProfileError.INCORRECT_USER_DATA)
    }

    if (!age || !Number.isInteger(age)) {
        errors.push(ValidateProfileError.INCORRECT_USER_AGE)
    }

    return errors
}