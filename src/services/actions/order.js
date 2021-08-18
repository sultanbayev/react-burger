import { getOrderNumber } from '../utils/api';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export const fetchOrder = (ingredientsToSend) => {
    return (dispatch) => {
        dispatch({
            type: GET_ORDER_REQUEST
        });
        getOrderNumber(ingredientsToSend)
            .then((res) => {
                if (res && res.success) {
                    dispatch({
                        type: GET_ORDER_SUCCESS,
                        number: res.order.number.toString()
                    });
                } else {
                    dispatch({
                        type: GET_ORDER_FAILED
                    });
                }
            })
            .catch((err) => {
                dispatch({
                    type: GET_ORDER_FAILED
                });
            });
    }
}