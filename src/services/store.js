import { compose, createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers';
import thunk from 'redux-thunk';
import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE,
    USER_WS_CONNECTION_START,
    USER_WS_CONNECTION_SUCCESS,
    USER_WS_CONNECTION_CLOSED,
    USER_WS_CONNECTION_ERROR,
    USER_WS_GET_MESSAGE
} from './actions/wsActions';
import { socketMiddleware } from './middleware/socketMiddleware';
import { userSocketMiddleware } from './middleware/userSocketMiddleware';
import { getCookie } from '../utils/cookie';

const wsActions = {
    wsInit: WS_CONNECTION_START,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_MESSAGE
};

const userWsActions = {
    wsInit: USER_WS_CONNECTION_START,
    onOpen: USER_WS_CONNECTION_SUCCESS,
    onClose: USER_WS_CONNECTION_CLOSED,
    onError: USER_WS_CONNECTION_ERROR,
    onMessage: USER_WS_GET_MESSAGE
}

const wsUrl = 'wss://norma.nomoreparties.space/orders/all';
const userWsUrl = 'wss://norma.nomoreparties.space/orders';
const accessToken = getCookie('accessToken');

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(
        thunk,
        socketMiddleware(wsUrl, wsActions),
        userSocketMiddleware(userWsUrl, userWsActions, accessToken)
    ));

export const store = createStore(rootReducer, enhancer);