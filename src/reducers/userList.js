

const generateUserList = (item, quantity, energyKcal, energyKJ) => ({
    item: item,
    quantity: quantity,
    energyKcal: energyKcal * quantity,
    energyKJ: energyKJ * quantity
});

const convertDateToString = (date) => {
    const newDate = (date.toISOString()).split('T')[0];
    return  newDate;
};

const initialState = {
    days: [
        {
            date: convertDateToString(new Date()),
            userItems: [],
            userEnergyKcal: 0,
            userEnergyKJ: 0
        }
    ],
    // {
    //     date: '',
    //     userItems: [],
    //     userEnergyKcal: 0,
    //     userEnergyKJ: 0
    // }
    currentDay: convertDateToString(new Date()),
    // userItems: [],
    userEnergyKcal: 0,
    userEnergyKJ: 0
};

const userList =(state = initialState, action) => {
    switch (action.type) {
        case 'ADD_USER_ITEM':
            const item = generateUserList(action.item, action.quantity, action.energyKcal, action.energyKJ);
            const newDays = state.days.map((current) => {
                if(current.date === state.currentDay) {
                    return {
                        ...current,
                        userItems: [
                            ...current.userItems,
                            item
                        ],
                        userEnergyKcal: current.userEnergyKcal + item.energyKcal,
                        userEnergyKJ: current.userEnergyKJ + item.energyKJ
                    };
                }
                return current;
            });
            console.log(newDays);
            return {
                ...state,
                days: newDays
            };
        case 'ERASE_USER_ITEM':
            const newList = state.userItems.filter((currentItem, index) => index !== action.index);
            return {
                ...state,
                userItems: newList,
                userEnergyKcal: state.userEnergyKcal - state.userItems[action.index].energyKcal,
                userEnergyKJ: state.userEnergyKJ - state.userItems[action.index].energyKJ
            }
        case 'CHANGE_DATE':
            const newDate = convertDateToString(action.date);
            const found = state.days.find(day => day.date === newDate) || false;
            if(found === false) 
                return {
                    ...state,
                    currentDay: newDate,
                    days: [
                        ...state.days,
                    {
                        date: newDate,
                        userItems: [],
                        userEnergyKcal: 0,
                        userEnergyKJ: 0
                    }] 
                }
            return {
                ...state,
                currentDay: newDate
            }
    
        default:
            return state
    }
}

export default userList;