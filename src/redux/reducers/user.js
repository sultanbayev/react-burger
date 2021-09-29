import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGIN_REQUEST,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILED,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,
    
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILED,    
} from '../actions/user';

const initialState = {
    user: {},
    isAuthorised: false,
    
    registerRequest: false,
    registerRequestFailed: false,
    registerErrorMessage: '',
    loginRequest: false,
    loginRequestFailed: false,
    loginErrorMessage: '',
    forgotPasswordRequest: false,
    forgotPasswordSuccess: false,
    forgotPasswordFailed: false,
    resetPasswordRequest: false,
    resetPasswordSuccess: false,
    resetPasswordFailed: false,
    resetPasswordErrorMessage: '',

    getUserRequest: false,
    getUserFailed: false,
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
                isAuthorised: true,
                registerRequest: false,
                registerErrorMessage: '',
            };
        }
        case REGISTER_FAILED: {
            return {
                ...state,
                registerRequestFailed: true,
                registerRequest: false,
                registerErrorMessage: action.message,
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
                loginRequest: false,
                user: action.user,
                isAuthorised: true,
                loginErrorMessage: '',
            };
        }
        case LOGIN_FAILED: {
            return {
                ...state,
                loginRequestFailed: true,
                loginRequest: false,
                loginErrorMessage: action.message,
            };
        }
        case FORGOT_PASSWORD_REQUEST: {
            return {
                ...state,
                forgotPasswordRequest: true,
            };
        }
        case FORGOT_PASSWORD_SUCCESS: {
            return {
                ...state,
                forgotPasswordSuccess: true,
                forgotPasswordRequest: false,
                forgotPasswordFailed: false,
            };
        }
        case FORGOT_PASSWORD_FAILED: {
            return {
                ...state,
                forgotPasswordFailed: true,
                forgotPasswordRequest: false,
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
                resetPasswordErrorMessage: '',
            };
        }
        case RESET_PASSWORD_FAILED: {
            return {
                ...state,
                resetPasswordFailed: true,
                resetPasswordRequest: false,
                resetPasswordErrorMessage: action.message,
            };
        }
        

        case GET_USER_REQUEST: {
            return {
                ...state,
                getUserRequest: true,
            }
        }
        case GET_USER_SUCCESS: {
            return {
                ...state,
                getUserRequest: false,
                getUserFailed: false,
                user: action.user,
                isAuthorised: true,
            }
        }
        case GET_USER_FAILED: {
            return {
                ...state,
                getUserFailed: true,
                getUserRequest: false,
            }
        }
        default: {
            return state
        }
    }
}