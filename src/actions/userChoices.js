export const getUserChoice = (fieldName, value) => ({
    type: 'GET_USER_CHOICE',
    fieldName: fieldName,
    value: value
});

export const caluculateUserNeeds = () => ({
    type: 'CALCULATE_USER_NEEDS'
});

export const saveUserInfo = () => ({
    type: 'SAVE_USER_INFO'
});