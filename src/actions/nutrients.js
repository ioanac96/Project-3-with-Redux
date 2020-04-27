import { nutrientsRequest } from "../components/requests";

export const nutrientsLoaded = nutrients => ({
    type: 'NUTRIENTS_LOADED',
    nutrients
});


export const loadNutrients = () => (dispatch) => {
    nutrientsRequest()
    .then(data => {
        dispatch(nutrientsLoaded(data));
    })
}