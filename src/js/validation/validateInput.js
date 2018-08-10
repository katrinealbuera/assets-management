import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export const validateName = (data, length) => {
    let errors = {};

    if (Validator.isEmpty(data.name)) {
        errors.name = 'This field is required';
    }

    if (data.name.length > length) {
        errors.name = 'Input must be less than ' + length;
    }

    return {
        errors,
        isValid : isEmpty(errors)
    }
}

export const validateSize = (data) => {
    let errors = {};

    if (Validator.isEmpty(data.size)) {
        errors.size = 'This field is required';
    }

    if (data.size.length > 5) {
        errors.size = 'Input length must be less than 5';
    }

    return {
        errors,
        isValid : isEmpty(errors)
    }
}

export const validateLength = (data, length) => {
    let error = {};

    if (data.name.length > length) {
        error.msg = 'Input must be less than ' + length;
    }

    return {
        error,
        isValid : isEmpty(error)
    }
}