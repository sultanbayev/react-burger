import { getCookie } from '../../utils/cookie';

export const socketMiddleware = (wsUrl, wsActions, isUserSocket = false) => {
  return store => {
    let socket = null;

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
          // console.log(parsedData);
          const { success, ...restParsedData } = parsedData;
          
          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };
      }

      if (type === wsClose) {
        socket.close();
      }

      next(action);
    };
  };
};