import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    INCREASE_INGREDIENT_COUNT,
    DECREASE_INGREDIENT_COUNT,
    RESET_INGREDIENTS_COUNT,
    TBurgerIngredientsActions
} from '../actions/burger-ingredients';
import { TIngredientWithCount } from '../types/data';

export type TBurgerIngredientsState = {
    items: TIngredientWithCount[];
    itemsRequest: boolean;
    itemsSuccess: boolean;
    itemsFailed: boolean;
} 

const initialState: TBurgerIngredientsState = {
    items: [],
    itemsRequest: false,
    itemsSuccess: false,
    itemsFailed: false,
};

export const burgerIngredientsReducer = (state = initialState, action: TBurgerIngredientsActions) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
              ...state,
              itemsRequest: true
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                itemsFailed: false,
                itemsSuccess: true,
                items: [...action.items].map((item) => ({ ...item, count: 0 })),
                itemsRequest: false
            };
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                itemsFailed: true,
                itemsRequest: false
            };
        }
        case INCREASE_INGREDIENT_COUNT: {
            if (action.item.type === 'bun') {
                return {
                    ...state,
                    items: [...state.items]
                        .map(item => item.type === 'bun' ? {...item, count: 0} : item)
                        .map(item => item._id === action.item._id ? {...item, count: item.count + 2} : item)
                }
            }
            return {
                ...state,
                items: [...state.items]
                    .map(item => item._id === action.item._id ? {...item, count: ++item.count} : item)
            }
        }
        case DECREASE_INGREDIENT_COUNT: {
            return {
                ...state,
                items: [...state.items]
                    .map(item => item._id === action.item._id ? {...item, count: --item.count} : item)
            }
        }
        case RESET_INGREDIENTS_COUNT: {
            return {
                ...state,
                items: [...state.items]
                    .map(item => ({ ...item, count: 0 }))
            }
        }
        default: {
            return state;
        }
    }
}