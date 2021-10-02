import { sendOrder } from '../../services/api';
import { clearComponentsAndResetCounts } from "./burger-constructor";
import { OPEN_MODAL } from './modal';
import OrderDetails from '../../components/modal/order-details/order-details';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export const fetchOrder = (ingredients) => {
    return (dispatch) => {
        dispatch({
            type: GET_ORDER_REQUEST
        });
        sendOrder(ingredients)
            .then((res) => {
                if (res && res.success) {
                    dispatch({
                        type: GET_ORDER_SUCCESS,
                        number: res.order.number.toString(),
                        name: res.name,
                    });
                    dispatch({
                        type: OPEN_MODAL,
                        content: <OrderDetails orderNumber={res.order.number.toString()} />
                    });
                    dispatch(clearComponentsAndResetCounts());
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