const initialState = {
    userItems: [],
    userEnergyKcal: 0,
    userEnergyKJ: 0
};

const generateUserList = (item, quantity, energyKcal, energyKJ) => ({
    item: item,
    quantity: quantity,
    energyKcal: energyKcal * quantity,
    energyKJ: energyKJ * quantity
});

const userList =(state = initialState, action) => {
    switch (action.type) {
        case 'ADD_USER_ITEM':
            const item = generateUserList(action.item, action.quantity, action.energyKcal, action.energyKJ);
            return {
                ...state,
                userItems: [
                    ...state.userItems,
                    item
                ],
                userEnergyKcal: state.userEnergyKcal + item.energyKcal,
                userEnergyKJ: state.userEnergyKJ + item.energyKJ
            }
        case 'ERASE_USER_ITEM':
            const newList = state.userItems.filter((currentItem, index) => index !== action.index);
            console.log(action.index);
            return {
                ...state,
                userItems: newList,
                userEnergyKcal: state.userEnergyKcal - state.userItems[action.index].energyKcal,
                userEnergyKJ: state.userEnergyKJ - state.userItems[action.index].energyKJ
            }
        default:
            return state
    }
}

export default userList;