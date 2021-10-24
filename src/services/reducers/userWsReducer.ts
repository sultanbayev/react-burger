import {
    USER_WS_CONNECTION_SUCCESS,
    USER_WS_CONNECTION_CLOSED,
    USER_WS_CONNECTION_ERROR,
    USER_WS_GET_MESSAGE,
    TWsActions
  } from '../actions/wsActions';
  import { TOrder } from '../types/data';

  export type TUserWsState = {
    wsConnected: boolean;
    orders: TOrder[];
  }
  
  const initialState: TUserWsState = {
    wsConnected: false,
    orders: [],
  };
  
  export const userWsReducer = (state = initialState, action: TWsActions) => {
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
  