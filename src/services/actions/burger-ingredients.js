import { getIngredients } from "../utils/api";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const INCREASE_INGREDIENT_COUNT = 'INCREASE_INGREDIENT_COUNT';
export const DECREASE_INGREDIENT_COUNT = 'DECREASE_INGREDIENT_COUNT';

export const fetchIngredients = () => {
    return (dispatch) => {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        });
        getIngredients()
            .then((res) => {
                if (res && res.success) {
                    dispatch({
                        type: GET_INGREDIENTS_SUCCESS,
                        items: res.data
                    });
                } else {
                    dispatch({
                        type: GET_INGREDIENTS_FAILED
                    });
                }
            })
            .catch((err) => {
                dispatch({
                    type: GET_INGREDIENTS_FAILED
                });
            });
    }
}