import {
    USER_WS_CONNECTION_SUCCESS,
    USER_WS_CONNECTION_CLOSED,
    USER_WS_CONNECTION_ERROR,
    USER_WS_GET_MESSAGE
  } from '../actions/wsActions';
import { userWsReducer } from './userWsReducer';

const initialState = {
    wsConnected: false,
    orders: [],
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

describe('websocket user reducer', () => {
    it('should return initital state', () => {
        expect(userWsReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle USER_WS_CONNECTION_SUCCESS', () => {
        expect(userWsReducer(initialState, {
            type: USER_WS_CONNECTION_SUCCESS
        })).toEqual({
            ...initialState,
            wsConnected: true,
        });
    });

    it('should handle USER_WS_CONNECTION_ERROR', () => {
        expect(userWsReducer(initialState, {
            type: USER_WS_CONNECTION_ERROR
        })).toEqual({
            ...initialState,
            wsConnected: false,
        });

        expect(userWsReducer({
            wsConnected: true,
            orders: orders,
        }, {
            type: USER_WS_CONNECTION_ERROR
        })).toEqual({
            wsConnected: false,
            orders: orders,
        });
    });

    it('should handle USER_WS_CONNECTION_CLOSED', () => {
        expect(userWsReducer(initialState, {
            type: USER_WS_CONNECTION_CLOSED
        })).toEqual({
            ...initialState,
            wsConnected: false,
        });

        expect(userWsReducer({
            wsConnected: true,
            orders: orders,
        }, {
            type: USER_WS_CONNECTION_CLOSED
        })).toEqual({
            wsConnected: false,
            orders: orders,
        });
    });

    it('should handle USER_WS_GET_MESSAGE with NONempty payload', () => {
        expect(userWsReducer({
            wsConnected: true,
            orders: [],
        }, {
            type: USER_WS_GET_MESSAGE,
            payload: { orders }
        })).toEqual({
            wsConnected: true,
            orders: orders,
        });

        expect(userWsReducer({
            wsConnected: true,
            orders: [ orders[0], orders[1] ],
        }, {
            type: USER_WS_GET_MESSAGE,
            payload: { orders }
        })).toEqual({
            wsConnected: true,
            orders: orders,
        });
    });

    it('should handle USER_WS_GET_MESSAGE with undefined payload', () => {
        expect(userWsReducer({
            wsConnected: true,
            orders: [ orders[0], orders[1] ],
        }, {
            type: USER_WS_GET_MESSAGE,
            payload: { undefined }
        })).toEqual({
            wsConnected: true,
            orders: [ orders[0], orders[1] ],
        });
    });

});
