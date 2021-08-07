import { ADD_STAFFING, REMOVE_STAFFING, SET_BUN } from '../constants/actions';

export default function reducer(state, action) {
    switch (action.type) {
        case ADD_STAFFING:
            return {
                ...state,
                staffings: [...state.staffings, action.payload.toAdd ]
            };
        case REMOVE_STAFFING:
            return {
                ...state,
                staffings: state.staffings.filter(c => c.uuid !== action.payload.toRemove.uuid)
            };
        case SET_BUN:
            return {
                ...state,
                bun: action.payload.bun
            };
        default:
            return state;
    }
};