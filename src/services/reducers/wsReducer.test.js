import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE
} from '../actions/wsActions';
import { wsReducer } from './wsReducer';

const initialState = {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0,
};

const orders = [
    {
        "_id":"616f47607deb54001ba61ea7",
        "status":"done",
        "name":"Флюоресцентный spicy бургер"
    },
    {
        "_id":"616f326f7deb54001ba61e5a",
        "status":"done",
        "name":"Флюоресцентный space бургер"
    },
    {
        "_id":"616ed66a7deb54001ba61dc0",
        "status":"done",
        "name":"Краторный бургер"
    },
];

describe('websocket reducer', () => {
    it('should return initital state', () => {
        expect(wsReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle WS_CONNECTION_SUCCESS', () => {
        expect(wsReducer(initialState, {
            type: WS_CONNECTION_SUCCESS
        })).toEqual({
            ...initialState,
            wsConnected: true,
        });
    });

    it('should handle WS_CONNECTION_ERROR', () => {
        expect(wsReducer(initialState, {
            type: WS_CONNECTION_ERROR
        })).toEqual({
            ...initialState,
            wsConnected: false,
        });

        expect(wsReducer({
            wsConnected: true,
            orders: orders,
            total: 4333,
            totalToday: 36,
        }, {
            type: WS_CONNECTION_ERROR
        })).toEqual({
            wsConnected: false,
            orders: orders,
            total: 4333,
            totalToday: 36,
        });
    });

    it('should handle WS_CONNECTION_CLOSED', () => {
        expect(wsReducer(initialState, {
            type: WS_CONNECTION_CLOSED
        })).toEqual({
            ...initialState,
            wsConnected: false,
        });

        expect(wsReducer({
            wsConnected: true,
            orders: orders,
            total: 4333,
            totalToday: 36,
        }, {
            type: WS_CONNECTION_CLOSED
        })).toEqual({
            wsConnected: false,
            orders: orders,
            total: 4333,
            totalToday: 36,
        });
    });

    it('should handle WS_GET_MESSAGE with NONempty payload', () => {
        expect(wsReducer({
            wsConnected: true,
            orders: [],
            total: 0,
            totalToday: 0,
        }, {
            type: WS_GET_MESSAGE,
            payload: { orders, total: 4333, totalToday: 36 }
        })).toEqual({
            wsConnected: true,
            orders: orders,
            total: 4333,
            totalToday: 36,
        });

        expect(wsReducer({
            wsConnected: true,
            orders: [ orders[0], orders[1] ],
            total: 4332,
            totalToday: 35,
        }, {
            type: WS_GET_MESSAGE,
            payload: { orders, total: 4333, totalToday: 36 }
        })).toEqual({
            wsConnected: true,
            orders: orders,
            total: 4333,
            totalToday: 36,
        });
    });

    it('should handle WS_GET_MESSAGE with undefined payload', () => {
        expect(wsReducer({
            wsConnected: true,
            orders: [ orders[0], orders[1] ],
            total: 4332,
            totalToday: 35,
        }, {
            type: WS_GET_MESSAGE,
            payload: { undefined }
        })).toEqual({
            wsConnected: true,
            orders: [ orders[0], orders[1] ],
            total: 4332,
            totalToday: 35,
        });
    });

});
