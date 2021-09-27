import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGIN_REQUEST,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,
    RESTORE_PASSWORD_REQUEST,
    RESTORE_PASSWORD_SUCCESS,
    RESTORE_PASSWORD_FAILED,    
} from '../actions/user';

const initialState = {
    user: null,

    registerRequest: false,
    registerRequestFailed: false,

    loginRequest: false,
    loginRequestFailed: false,

    resetPasswordRequest: false,
    resetPasswordSuccess: false,
    resetPasswordFailed: false,

    restorePasswordRequest: false,
    restorePasswordSuccess: false,
    restorePasswordFailed: false,
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
        case RESET_PASSWORD_REQUEST: {
            return {
                ...state,
                resetPasswordRequest: true,
            };
        }
        case RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                resetPasswordSuccess: true,
                resetPasswordRequest: false,
                resetPasswordFailed: false,
            };
        }
        case RESET_PASSWORD_FAILED: {
            return {
                ...state,
                resetPasswordFailed: true,
            };
        }
        case RESTORE_PASSWORD_REQUEST: {
            return {
                ...state,
                restorePasswordRequest: true,
            };
        }
        case RESTORE_PASSWORD_SUCCESS: {
            return {
                ...state,
                restorePasswordSuccess: true,
                restorePasswordRequest: false,
                restorePasswordFailed: false,
            };
        }
        case RESTORE_PASSWORD_FAILED: {
            return {
                ...state,
                restorePasswordFailed: true,
            };
        }
        default: {
            return state
        }
    }
}