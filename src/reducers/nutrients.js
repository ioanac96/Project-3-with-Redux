const nutrients = (state=[], action) => {
    switch (action.type) {
        case 'NUTRIENTS_LOADED':
            return action.nutrients;
            
        default:
            return state;
    }
}

export default nutrients;