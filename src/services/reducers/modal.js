import {
    OPEN_MODAL_WITH_INGREDIENT,
    OPEN_MODAL_WITH_ORDER,
    CLOSE_MODAL
} from '../actions/modal';
import { modalContentTypes } from '../utils/constants';

const initialState = {
    isOpen: false,
    content: '',
}

export const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_MODAL_WITH_INGREDIENT: {
            return {
                ...state,
                isOpen: true,
                content: modalContentTypes.INGREDIENT_DETAILS,
            };
        }
        case OPEN_MODAL_WITH_ORDER: {
            return {
                ...state,
                isOpen: true,
                content: modalContentTypes.ORDER_DETAILS,
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