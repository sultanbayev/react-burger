import { OPEN_MODAL, CLOSE_MODAL } from '../actions/modal';
import { modalReducer } from './modal';

const initialState = {
    isOpen: false,
    content: null,
};

describe('modal reducer', () => {
    it('should return initial state', () => {
        expect(modalReducer(undefined, {})).toEqual(initialState);
    });

    it('should open modal', () => {
        expect(modalReducer(initialState, {
            type: OPEN_MODAL,
            content: 'someModalConent',
        })).toEqual({
            isOpen: true,
            content: 'someModalConent',
        });
    });

    it('should close modal', () => {
        expect(modalReducer({
            isOpen: true,
            content: 'someModalConent',
        }, {
            type: CLOSE_MODAL
        })).toEqual(initialState);
    });
})