import { ReactNode } from 'react';
import { OPEN_MODAL, CLOSE_MODAL, TModalActions } from '../actions/modal';

export type TModalState = {
    isOpen: boolean;
    content: ReactNode | null;
}

const initialState: TModalState = {
    isOpen: false,
    content: null,
}

export const modalReducer = (state = initialState, action: TModalActions) => {
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