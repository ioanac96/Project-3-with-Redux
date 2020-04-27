import { searchRequest } from "../components/requests";

export const itemsLoaded = items => ({
    type: 'ITEMS_LOADED',
    items
});

export const setLoadingValue = value => ({
    type: 'SET_LOADING_VALUE',
    loading: value
});

export const loadItems = (text, loading) => (dispatch) => {
    if(text !== '') {
        dispatch(setLoadingValue(true));
        searchRequest(text)
        .then(data => {
            dispatch(itemsLoaded(data.common))
        })
    }
    // if(loading === 'undefined') {
    //     dispatch(setLoadingValue(false));
    // }
}