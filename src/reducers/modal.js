import { CLOSE_MODAL, OPEN_MODAL } from '../constants/actions';

export default function reducer(state, action) {
    switch (action.type) {
      case CLOSE_MODAL:
        return {...state, visible: false, content: null};
      case OPEN_MODAL:
        return {...state, visible: true, content: action.payload.content};
      default:
        return state;
    }
};