
function validateRequiredInput(field) {
    return {
        field: field.length === 0
    };
}

export default {
    Required : validateRequiredInput
}