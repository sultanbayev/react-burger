import { OPEN_MODAL, CLOSE_MODAL } from '../actions/modal';

const initialState = {
    isOpen: false,
    content: null,
}

export const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_MODAL: {
            return {
                ...state,
                isOpen: true,
                content: action.content,
            };
        }
        case CLOSE_MODAL: {
            return initialState;
        }
        default: {
            return state;
        }
    }
}