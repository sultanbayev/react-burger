import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGIN_REQUEST
} from '../actions/user';

const initialState = {
    user: null,
    registerRequest: false,
    registerRequestFailed: false,
    loginRequest: false,
    loginRequestFailed: false,
}

export const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case REGISTER_REQUEST: {
            return {
                ...state,
                registerRequest: true
            }
        }
        case REGISTER_SUCCESS: {
            return {
                ...state,
                registerRequestFailed: false,
                user: action.user,
                registerRequest: false
            };
        }
        case REGISTER_FAILED: {
            return {
                ...state,
                registerRequestFailed: true,
                registerRequest: false
            };
        }
        case LOGIN_REQUEST: {
            return {
                ...state,
                loginRequest: true
            }
        }
        case LOGIN_SUCCESS: {
            return {
                ...state,
                loginRequestFailed: false,
                user: action.user,
                loginRequest: false,
            };
        }
        case LOGIN_FAILED: {
            return {
                ...state,
                loginRequestFailed: true,
                loginRequest: false
            };
        }
        default: {
            return state
        }
    }
}