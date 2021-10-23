import { store } from '../store';
import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { TBurgerIngredientsActions } from '../actions/burger-ingredients';
import { TBurgerConstructorActions } from '../actions/burger-constructor';
import { TOrderActions } from '../actions/order';
import { TUserActions } from '../actions/user';
import { TWsActions } from '../actions/wsActions';

type TApplicationActions =
    | TBurgerIngredientsActions
    | TBurgerConstructorActions
    | TOrderActions
    | TUserActions
    | TWsActions

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
    ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;