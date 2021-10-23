import {
    USER_WS_CONNECTION_SUCCESS,
    USER_WS_CONNECTION_CLOSED,
    USER_WS_CONNECTION_ERROR,
    USER_WS_GET_MESSAGE
  } from '../actions/wsActions';
import { TUserWsState, userWsReducer } from './userWsReducer';

const initialState: TUserWsState = {
    wsConnected: false,
    orders: [],
};

const orders = [{
    "_id": "617425fe7deb54001ba6223a",
    "ingredients": ["60d3b41abdacab0026a733c7", "60d3b41abdacab0026a733c7", "60d3b41abdacab0026a733cf"],
    "status": "done",
    "name": "Флюоресцентный антарианский бургер",
    "createdAt": "2021-10-23T15:10:54.297Z",
    "updatedAt": "2021-10-23T15:10:54.455Z",
    "number": 4894
}, {
    "_id": "6173cf1e7deb54001ba621b1",
    "ingredients": ["60d3b41abdacab0026a733cd", "60d3b41abdacab0026a733c7", "60d3b41abdacab0026a733c7"],
    "status": "done",
    "name": "Флюоресцентный space бургер",
    "createdAt": "2021-10-23T09:00:14.925Z",
    "updatedAt": "2021-10-23T09:00:15.069Z",
    "number": 4893
}, {
    "_id": "6172f5167deb54001ba6208c",
    "ingredients": ["60d3b41abdacab0026a733c6"],
    "status": "done",
    "name": "Краторный бургер",
    "createdAt": "2021-10-22T17:29:58.497Z",
    "updatedAt": "2021-10-22T17:29:58.568Z",
    "number": 4892
}];

describe('websocket user reducer', () => {
    it('should return initital state', () => {
        expect(userWsReducer(undefined, { type: undefined })).toEqual(initialState);
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
});
