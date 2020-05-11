

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
    currentDay: convertDateToString(new Date()),
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
            return {
                ...state,
                days: newDays
            };
        case 'ERASE_USER_ITEM':

            const newDaysList = state.days.map((current) => {
                if(current.date === state.currentDay) {
                    const foundItem = current.userItems.find((item,index) => index === action.index);
                    const foundEnergyKcal = foundItem.energyKcal;
                    const foundEnergyKJ = foundItem.energyKJ; 
                    const newList = current.userItems.filter((currentItem, index) => index !== action.index);
                    return {
                        ...current,
                        userItems: newList,
                        userEnergyKcal: current.userEnergyKcal - foundEnergyKcal,
                        userEnergyKJ: current.userEnergyKJ - foundEnergyKJ
                    };
                }
                return current;
            });
            return {
                ...state,
                days: newDaysList
            }
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