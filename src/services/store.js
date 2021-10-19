import { compose, createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers';
import thunk from 'redux-thunk';
import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_CLOSE,
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE,
    USER_WS_CONNECTION_START,
    USER_WS_CONNECTION_CLOSE,
    USER_WS_CONNECTION_SUCCESS,
    USER_WS_CONNECTION_CLOSED,
    USER_WS_CONNECTION_ERROR,
    USER_WS_GET_MESSAGE
} from './actions/wsActions';
import { socketMiddleware } from './middleware/socketMiddleware';

const wsActions = {
    wsInit: WS_CONNECTION_START,
    wsClose: WS_CONNECTION_CLOSE,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_MESSAGE
};

const userWsActions = {
    wsInit: USER_WS_CONNECTION_START,
    wsClose: USER_WS_CONNECTION_CLOSE,
    onOpen: USER_WS_CONNECTION_SUCCESS,
    onClose: USER_WS_CONNECTION_CLOSED,
    onError: USER_WS_CONNECTION_ERROR,
    onMessage: USER_WS_GET_MESSAGE
}

const wsUrl = 'wss://norma.nomoreparties.space/orders/all';
const userWsUrl = 'wss://norma.nomoreparties.space/orders';

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(
        thunk,
        socketMiddleware(wsUrl, wsActions),
        socketMiddleware(userWsUrl, userWsActions, true)
    ));

export const store = createStore(rootReducer, enhancer);