export const addUserItem = (item, quantity, energyKcal, energyKJ) => ({
    type: 'ADD_USER_ITEM',
    item: item, 
    quantity: quantity,
    energyKcal: energyKcal,
    energyKJ: energyKJ
});

export const eraseUserItem = (index) => ({
    type: 'ERASE_USER_ITEM',
    index: index
});