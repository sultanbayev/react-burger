import { ADD_INGREDIENT, REMOVE_INGREDIENT } from "../actions/ingredient";

const initialState = {
    ingredient: {}
};

export const ingredientReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT: {
            return {
                ...state,
                ingredient: action.ingredient
            };
        }
        case REMOVE_INGREDIENT: {
            return {
                ...state,
                ingredient: {}
            };
        }
        default: {
            return state;
        }
    }
}