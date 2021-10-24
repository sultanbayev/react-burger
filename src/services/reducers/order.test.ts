import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED
} from '../actions/order';
import { orderReducer, TOrderState } from './order';

const initialState: TOrderState = {
    number: null,
    orderRequest: false,
    orderFailed: false,
};

describe('order reducer', () => {
    it('should return the initial state', () => {
        expect(orderReducer(undefined, {
            type: undefined
        })).toEqual(initialState)
    });

    it('should set orderRequest to TRUE', () => {
        expect(orderReducer(initialState, {
                type: GET_ORDER_REQUEST
            })).toEqual({
                ...initialState,
                orderRequest: true,
            });

        expect(orderReducer({
                number: '4235',
                orderRequest: false,
                orderFailed: false,
            }, { type: GET_ORDER_REQUEST })).toEqual({
                number: '4235',
                orderFailed: false,
                orderRequest: true,
            });
    });

    it('should set orderRequest to FALSE and orderFailed to TRUE', () => {
        expect(orderReducer(initialState, {
                type: GET_ORDER_FAILED
            })).toEqual({
                ...initialState,
                orderRequest: false,
                orderFailed: true,
            });

        expect(orderReducer({
                number: '4235',
                orderRequest: false,
                orderFailed: false,
            }, {
                type: GET_ORDER_FAILED
            })).toEqual({
                number: '4235',
                orderRequest: false,
                orderFailed: true,
            });
    });

    it('should set order name and order number', () => {
        expect(orderReducer(initialState, {
                type: GET_ORDER_SUCCESS,
                number: '4235'
            })).toEqual({
                number: '4235',
                orderRequest: false,
                orderFailed: false,
            });

        expect(orderReducer({
                number: '4235',
                orderRequest: true,
                orderFailed: false,
            }, {
                type: GET_ORDER_SUCCESS,
                number: '4666'
            })).toEqual({
                number: '4666',
                orderRequest: false,
                orderFailed: false,
            });
    });
});