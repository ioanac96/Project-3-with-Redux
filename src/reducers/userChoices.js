const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};

const initialState = {
    weight: userInfo.weight || 0,
    height: userInfo.height || 0,
    age: userInfo.age || 0,
    gender: userInfo.gender || '',
    BMR: userInfo.BMR || 0,
    userWish: userInfo.userWish || '',
    message: userInfo.message || '',
    calories: userInfo.calories || 0
};

const userChoices = (state = initialState, action) => {
    switch(action.type) {
        case 'GET_USER_CHOICE':
            return  {
                ...state,
                [action.fieldName]: action.value
            }
        case 'CALCULATE_USER_NEEDS':
            let message = '';
            let calories = 0;
            const {weight, height, age, gender, BMR, userWish} = state;
            const newWeight = Number.parseFloat(weight,10);
            const newHeight = Number.parseFloat(height,10);
            const newAge = Number.parseFloat(age,10);


            if(newWeight > 10 && newHeight > 0 && newAge >= 18 && userWish.value !== '' && BMR !==0 && gender.value !== '') {
                if(gender.value === 'men') {
                    calories = (10 * newWeight + 6.25 * newHeight - 5 * newAge + 5) * BMR.value;
                }
                else {
                    calories = (10 * newWeight + 6.25 * newHeight - 5 * newAge - 161) * BMR.value;
                }
                if(userWish.value === 'lose') {
                    calories = calories - 500;
                    if(gender.value === 'women' && calories < 1200) {
                        message = `You need ${calories}/per day to lose 0.5kg in a week, but it is not safe to lose weight!`;
                    }
                    else if(gender.value === 'men' && calories < 1800) {
                        message = `You need ${calories}/per day to lose 0.5kg in a week, but it is not safe to lose weight!`;
                    }
                    else message = `You need ${calories}/per day to lose 0.5kg in a week.`;
                }
                if(userWish.value === 'gain') {
                    calories = calories + 500;
                    message = `You need ${calories}/per day to gain 0.5kg in a week.`;
                }
                 if(userWish.value === 'maintain') {
                    message = `You need ${calories}/per day to maintain your weight.`;
                }
               return {
                   ...state,
                   message: message,
                   calories: calories
               }
            }
            else {
                return {
                    ...state,
                    message: 'Please complete all the spaces and choose your options!',
                    calories: calories
                }
            
            }
        case 'SAVE_USER_INFO':
            localStorage.setItem('userInfo', JSON.stringify(state));
            return state

        default: 
            return state
    }
}

export default userChoices;


