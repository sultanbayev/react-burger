import {
    USER_WS_CONNECTION_SUCCESS,
    USER_WS_CONNECTION_CLOSED,
    USER_WS_CONNECTION_ERROR,
    USER_WS_GET_MESSAGE
  } from '../actions/wsActions';
  
  const initialState = {
    wsConnected: false,
    orders: [],
  };
  
  export const userWsReducer = (state = initialState, action) => {
    switch (action.type) {
      case USER_WS_CONNECTION_SUCCESS:
        return {
          ...state,
          wsConnected: true
        };
  
      case USER_WS_CONNECTION_ERROR:
        return {
          ...state,
          wsConnected: false
        };
  
      case USER_WS_CONNECTION_CLOSED:
        return {
          ...state,
          wsConnected: false
        };
  
      case USER_WS_GET_MESSAGE:
        return {
            ...state,
            orders: action.payload.orders,
        };
  
      default:
        return state;
    }
  };
  