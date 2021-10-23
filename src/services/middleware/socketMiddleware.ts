import { getCookie } from '../../utils/cookie';

type TActions = {
  wsInit: string;
  wsClose: string;
  onOpen: string;
  onMessage: string;
  onClose: string;
  onError: string;
}

export const socketMiddleware = (wsUrl: string, wsActions: TActions, isUserSocket: boolean = false) => {
  return store => {

    let socket: WebSocket | null = null;

    return next => action => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, wsClose, onOpen, onMessage, onClose, onError } = wsActions;
      const accessToken = getCookie('accessToken');

      if (type === wsInit) {
        if (isUserSocket && accessToken) {
          socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
        } else {
          socket = new WebSocket(`${wsUrl}`);
        }
      }
      
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          if (success) {
            dispatch({ type: onMessage, payload: restParsedData });
          }
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };
      }

      if (socket && type === wsClose) {
        socket.close();
      }

      next(action);
    };
  };
};