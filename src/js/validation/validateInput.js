import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export const validateName = (data) => {
    let errors = {};

    if (Validator.isEmpty(data.name)) {
        errors.name = 'This field is required';
    }

    if (data.name.length > 30) {
        errors.name = 'Input must be less than 30';
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

    return {
        errors,
        isValid : isEmpty(errors)
    }
}