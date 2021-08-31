import { combineReducers } from "redux";
import { burgerIngredientsReducer } from './burger-ingredients';
import { burgerConstructorReducer } from "./burger-constructor";
import { orderReducer } from './order';
import { ingredientReducer } from "./ingredient";
import { modalReducer } from './modal';

export const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    order: orderReducer,
    ingredientDetails: ingredientReducer,
    modal: modalReducer,
});