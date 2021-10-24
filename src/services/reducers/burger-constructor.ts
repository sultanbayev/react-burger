import {
    ADD_CONSTRUCTOR_COMPONENT,
    REMOVE_CONSTRUCTOR_COMPONENT,
    REORDER_CONSTRUCTOR_COMPONENTS,
    CLEAR_CONSTRUCTOR_COMPONENTS,
    TBurgerConstructorActions
} from '../actions/burger-constructor';
import { TIngredientWithUuid } from '../types/data';

export type TBurgerConstructorState = {
    bun: TIngredientWithUuid | null,
    staffings: TIngredientWithUuid[],
}

const initialState: TBurgerConstructorState = {
    bun: null,
    staffings: [],
};

export const burgerConstructorReducer = (state = initialState, action: TBurgerConstructorActions) => {
    switch(action.type) {
        case ADD_CONSTRUCTOR_COMPONENT: {
            if (action.item.type === 'bun') {
                return {
                    ...state,
                    bun: action.item,
                }
            } else {
                return {
                    ...state,
                    staffings: [...state.staffings, action.item ],
                }
            }
        }
        case REMOVE_CONSTRUCTOR_COMPONENT: {
            return {
                ...state,
                staffings: [...state.staffings].filter(item => item.uuid !== action.item.uuid),
            }
        }
        case REORDER_CONSTRUCTOR_COMPONENTS: {
            return {
                ...state,
                staffings: action.reordered
            }
        }
        case CLEAR_CONSTRUCTOR_COMPONENTS: {
            return initialState;
        }
        default: {
            return state;
        }
    }
}