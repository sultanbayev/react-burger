import { ADD_INGREDIENT, REMOVE_INGREDIENT } from "./ingredient";

export const OPEN_MODAL_WITH_INGREDIENT = 'OPEN_MODAL_WITH_INGREDIENT';
export const OPEN_MODAL_WITH_ORDER = 'OPEN_MODAL_WITH_ORDER';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const closeModalWithIngredient = () => {
    return (dispatch) => {
        dispatch({
            type: CLOSE_MODAL
        })
        dispatch({
            type: REMOVE_INGREDIENT
        })
    }
}

export const openModalWithIngredient = (ingredient) => {
    return (dispatch) => {
        dispatch({
            type: ADD_INGREDIENT,
            ingredient: ingredient
        });
        dispatch({
            type: OPEN_MODAL_WITH_INGREDIENT,
        });
    }
}