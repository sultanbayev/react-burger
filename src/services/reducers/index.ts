import { combineReducers } from "redux";
import { burgerIngredientsReducer } from './burger-ingredients';
import { burgerConstructorReducer } from "./burger-constructor";
import { orderReducer } from './order';
import { userReducer } from "./user";
import { wsReducer } from './wsReducer';
import { userWsReducer } from './userWsReducer';

export const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    order: orderReducer,
    user: userReducer,
    orders: wsReducer,
    userOrders: userWsReducer,
});

export type RootState = ReturnType<typeof rootReducer>