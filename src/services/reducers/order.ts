import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
    RESET_ORDER,
    TOrderActions
} from '../actions/order';

export type TOrderState = {
    number: string | null,
    orderRequest: boolean,
    orderFailed: boolean,
}

const initialState: TOrderState = {
    number: null,
    orderRequest: false,
    orderFailed: false,
};

export const orderReducer = (state = initialState, action: TOrderActions) => {
    switch (action.type) {
        case GET_ORDER_REQUEST: {
            return {
              ...state,
              orderRequest: true
            };
        }
        case GET_ORDER_SUCCESS: {
            return {
                ...state,
                number: action.number,
                orderFailed: false,
                orderRequest: false
            };
        }
        case GET_ORDER_FAILED: {
            return {
                ...state,
                orderFailed: true,
                orderRequest: false
            };
        }
        case RESET_ORDER: {
            return initialState
        }
        default: {
            return state;
        }
    }
}