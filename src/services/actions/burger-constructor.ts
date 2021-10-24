import {
    increaseIngredientCount,
    decreaseIngredientCount,
    resetIngredientsCount
} from './burger-ingredients';
import { TIngredientWithUuid } from '../types/data';
import { AppDispatch, AppThunk } from '../types';

export const ADD_CONSTRUCTOR_COMPONENT = 'ADD_CONSTRUCTOR_COMPONENT' as const;
export const REMOVE_CONSTRUCTOR_COMPONENT = 'REMOVE_CONSTRUCTOR_COMPONENT'as const;
export const REORDER_CONSTRUCTOR_COMPONENTS = 'REORDER_CONSTRUCTOR_COMPONENTS'as const;
export const CLEAR_CONSTRUCTOR_COMPONENTS = 'CLEAR_CONSTRUCTOR_COMPONENTS' as const;

interface IAddConstructorComponentAction {
    readonly type: typeof ADD_CONSTRUCTOR_COMPONENT;
    readonly item: TIngredientWithUuid;
}

interface IRemoveConstructorComponentAction {
    readonly type: typeof REMOVE_CONSTRUCTOR_COMPONENT;
    readonly item: TIngredientWithUuid;
}

interface IReorderConstructorComponentsAction {
    readonly type: typeof REORDER_CONSTRUCTOR_COMPONENTS;
    readonly reordered: TIngredientWithUuid[];
}

interface IClearConstructorComponentsAction {
    readonly type: typeof CLEAR_CONSTRUCTOR_COMPONENTS;
}

interface IDefault {
    readonly type: undefined;
}

export type TBurgerConstructorActions =
    | IAddConstructorComponentAction
    | IRemoveConstructorComponentAction
    | IReorderConstructorComponentsAction
    | IClearConstructorComponentsAction
    | IDefault

export const addConstructorComponent = (item: TIngredientWithUuid): IAddConstructorComponentAction => ({
    type: ADD_CONSTRUCTOR_COMPONENT,
    item
});

export const removeConstructorComponent = (item: TIngredientWithUuid): IRemoveConstructorComponentAction => ({
    type: REMOVE_CONSTRUCTOR_COMPONENT,
    item
});

export const reorderConstructorComponents = (reordered: TIngredientWithUuid[]): IReorderConstructorComponentsAction => ({
    type: REORDER_CONSTRUCTOR_COMPONENTS,
    reordered
});

export const clearConstructorComponents = (): IClearConstructorComponentsAction => ({
    type: CLEAR_CONSTRUCTOR_COMPONENTS
});

export const addConstructorComponentThunk: AppThunk = (item: TIngredientWithUuid) =>
    (dispatch: AppDispatch) => {
        dispatch(addConstructorComponent(item));
        dispatch(increaseIngredientCount(item))
    }

export const clearComponentsAndResetCountsThunk: AppThunk = () =>
    (dispatch: AppDispatch) => {
        dispatch(clearConstructorComponents());
        dispatch(resetIngredientsCount());
    }

export const removeConstructorComponentThunk: AppThunk = (item: TIngredientWithUuid) => 
    (dispatch: AppDispatch) => {
        dispatch(removeConstructorComponent(item));
        dispatch(decreaseIngredientCount(item))
    }