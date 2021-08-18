import {
    INCREASE_INGREDIENT_COUNT,
    DECREASE_INGREDIENT_COUNT
} from './burger-ingredients';

export const ADD_CONSTRUCTOR_COMPONENT = 'ADD_CONSTRUCTOR_COMPONENT';
export const REMOVE_CONSTRUCTOR_COMPONENT = 'REMOVE_CONSTRUCTOR_COMPONENT';
export const REORDER_CONSTRUCTOR_COMPONENTS = 'REORDER_CONSTRUCTOR_COMPONENTS';

export const addConstructorComponent = (item) => {
    return (dispatch) => {
        dispatch({
            type: ADD_CONSTRUCTOR_COMPONENT,
            item: item,
        });
        dispatch({
            type: INCREASE_INGREDIENT_COUNT,
            item: item,
        })
    }
}

export const removeConstructorComponent = (item) => {
    return (dispatch) => {
        dispatch({
            type: REMOVE_CONSTRUCTOR_COMPONENT,
            item: item,
        });
        dispatch({
            type: DECREASE_INGREDIENT_COUNT,
            item: item,
        })
    }
}