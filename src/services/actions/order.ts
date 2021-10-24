import { sendOrder } from '../api';
import { clearComponentsAndResetCountsThunk } from "./burger-constructor";
import { AppDispatch, AppThunk } from '../types';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST' as const;
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS' as const;
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED' as const;
export const RESET_ORDER = 'RESET_ORDER' as const;

interface IGetOrderRequestAction {
    readonly type: typeof GET_ORDER_REQUEST;
}

interface IGetOrderFailedAction {
    readonly type: typeof GET_ORDER_FAILED;
}

interface IGetOrderSuccessAction {
    readonly type: typeof GET_ORDER_SUCCESS;
    readonly number: string;
}

interface IResetOrderAction {
    readonly type: typeof RESET_ORDER;
}

interface IDefault {
    readonly type: undefined;
}

export type TOrderActions = 
    | IGetOrderRequestAction
    | IGetOrderFailedAction
    | IGetOrderSuccessAction
    | IResetOrderAction
    | IDefault

export const getOrderRequest = (): IGetOrderRequestAction => ({
    type: GET_ORDER_REQUEST
});

export const getOrderFailed = (): IGetOrderFailedAction => ({
    type: GET_ORDER_FAILED
});

export const getOrderSuccess = (number: string): IGetOrderSuccessAction => ({
    type: GET_ORDER_SUCCESS,
    number
});

export const resetOrder = (): IResetOrderAction => ({
    type: RESET_ORDER
});

export const fetchOrderThunk: AppThunk = (ingredients: { ingredients: string[] }) => {
    return (dispatch: AppDispatch | AppThunk) => {
        dispatch(getOrderRequest());
        sendOrder(ingredients)
            .then((res) => {
                if (res && res.success) {
                    const number = res.order.number.toString();
                    dispatch(getOrderSuccess(number));
                    dispatch(clearComponentsAndResetCountsThunk());
                } else {
                    dispatch(getOrderFailed());
                }
            })
            .catch((err) => {
                dispatch(getOrderFailed());
            });
    }
}