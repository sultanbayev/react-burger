import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE
  } from '../actions/wsActions';
  
  const initialState = {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0,
  };
  
  export const wsReducer = (state = initialState, action) => {
    switch (action.type) {
      case WS_CONNECTION_SUCCESS:
        return {
          ...state,
          wsConnected: true
        };
  
      case WS_CONNECTION_ERROR:
        return {
          ...state,
          wsConnected: false
        };
  
      case WS_CONNECTION_CLOSED:
        return {
          ...state,
          wsConnected: false
        };
  
      case WS_GET_MESSAGE:
        return {
            ...state,
            orders: action.payload.orders ? action.payload.orders : state.orders ,
            total: action.payload.total ? action.payload.total : state.total,
            totalToday: action.payload.totalToday ? action.payload.totalToday : state.totalToday,
        };
  
      default:
        return state;
    }
  };
  