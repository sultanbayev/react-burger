import { getIngredients } from "../api";
import { TIngredient, TIngredientWithUuid } from "../types/data";
import { AppDispatch, AppThunk } from '../types';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST' as const;
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS'  as const;
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED'  as const;
export const INCREASE_INGREDIENT_COUNT = 'INCREASE_INGREDIENT_COUNT'  as const;
export const DECREASE_INGREDIENT_COUNT = 'DECREASE_INGREDIENT_COUNT'  as const;
export const RESET_INGREDIENTS_COUNT = 'RESET_INGREDIENTS_COUNT'  as const;

export interface IGetIngredientsRequestAction {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccessAction {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly items: TIngredient[];
}

export interface IGetIngredientsFailedAction {
    readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface IIncreaseIngredientCountAction {
    readonly type: typeof INCREASE_INGREDIENT_COUNT;
    readonly item: TIngredientWithUuid;
}

export interface IDecreaseIngredientCountAction {
    readonly type: typeof DECREASE_INGREDIENT_COUNT;
    readonly item: TIngredientWithUuid;
}

export interface IResetIngredientsCountAction  {
    readonly type: typeof RESET_INGREDIENTS_COUNT;
}

export interface IDefault {
    readonly type: undefined;
}

export type TBurgerIngredientsAction =
    | IGetIngredientsRequestAction
    | IGetIngredientsSuccessAction
    | IGetIngredientsFailedAction
    | IIncreaseIngredientCountAction
    | IDecreaseIngredientCountAction
    | IResetIngredientsCountAction
    | IDefault

export const getIngredientsRequest = (): IGetIngredientsRequestAction => ({
    type: GET_INGREDIENTS_REQUEST
});

export const getIngredientsSuccess = (data: TIngredient[]): IGetIngredientsSuccessAction => ({
    type: GET_INGREDIENTS_SUCCESS,
    items: data
});

export const getIngredientsFailed = (): IGetIngredientsFailedAction => ({
    type: GET_INGREDIENTS_FAILED
});

export const increaseIngredientCount = (item: TIngredientWithUuid): IIncreaseIngredientCountAction => ({
    type: INCREASE_INGREDIENT_COUNT,
    item
});

export const decreaseIngredientCount = (item: TIngredientWithUuid): IDecreaseIngredientCountAction => ({
    type: DECREASE_INGREDIENT_COUNT,
    item
});

export const resetIngredientsCount = (): IResetIngredientsCountAction => ({
    type: RESET_INGREDIENTS_COUNT,
});

export const getIngredientsThunk: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch(getIngredientsRequest());
    getIngredients()
        .then((res) => {
            if (res && res.success) {
                dispatch(getIngredientsSuccess(res.data));
            } else {
                dispatch(getIngredientsFailed());
            }
        })
        .catch((err) => {
            dispatch(getIngredientsFailed());
        });
}