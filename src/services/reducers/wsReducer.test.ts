import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE
} from '../actions/wsActions';
import {
    wsReducer,
    TWsState
} from './wsReducer';

const initialState: TWsState = {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0,
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

describe('websocket reducer', () => {
    it('should return initital state', () => {
        expect(wsReducer(undefined, { type: undefined })).toEqual(initialState);
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
            payload: {
                orders: orders,
                total: 4333,
                totalToday: 36
            }
        })).toEqual({
            wsConnected: true,
            orders: orders,
            total: 4333,
            totalToday: 36,
        });

        expect(wsReducer({
            wsConnected: true,
            orders: [orders[0], orders[1]],
            total: 4332,
            totalToday: 35,
        }, {
            type: WS_GET_MESSAGE,
            payload: {
                orders: orders,
                total: 4333,
                totalToday: 36
            }
        })).toEqual({
            wsConnected: true,
            orders: orders,
            total: 4333,
            totalToday: 36,
        });
    });
});