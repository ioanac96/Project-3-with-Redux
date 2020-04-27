const initialState = {
  loading: false,
  items: []
};

const items = (state = initialState, action) => {
    switch (action.type) {
      case 'ITEMS_LOADED':
        return {
          ...state, 
          loading: false,
          items: action.items
        }
      case 'SET_LOADING_VALUE': 
        return {
          ...state,
          loading: action.loading
        }
      
      default:
        return state;
    }
  }
  
  export default items;
  