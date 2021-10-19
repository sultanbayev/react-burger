import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED
} from '../actions/order';
import { orderReducer } from './order';

const initialState = {
    name: '',
    number: '',
    orderRequest: false,
    orderFailed: false,
};

describe('order reducer', () => {
    it('should return the initial state', () => {
        expect(orderReducer(undefined, {})).toEqual(initialState)
    });

    it('should set orderRequest to TRUE', () => {
        expect(orderReducer(initialState, { type: GET_ORDER_REQUEST })).toEqual({
            ...initialState,
            orderRequest: true,
        });
    });

    it('should set orderRequest to FALSE and orderFailed to TRUE', () => {
        expect(orderReducer(initialState, { type: GET_ORDER_FAILED })).toEqual({
            ...initialState,
            orderRequest: false,
            orderFailed: true,
        });
    });

    it('should set order name and order number', () => {
        expect(orderReducer(initialState, {
                type: GET_ORDER_SUCCESS,
                name: 'Black Hole Singularity острый бургер',
                number: '4235' })
            ).toEqual({
                name: 'Black Hole Singularity острый бургер',
                number: '4235',
                orderRequest: false,
                orderFailed: false,
            });
    });
});