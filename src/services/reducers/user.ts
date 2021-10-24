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
    REFRESH_TOKEN_REQUEST,
    REFRESH_TOKEN_SUCCESS,
    REFRESH_TOKEN_FAILED,
    PATCH_USER_REQUEST,
    PATCH_USER_SUCCESS,
    PATCH_USER_FAILED,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,
    TUserActions
} from '../actions/user';
import { TUser } from '../types/data';

export type TUserState = {
    user: TUser | {},
    isAuthorised: boolean,
    
    registerRequest: boolean,
    registerFailed: boolean,
    registerErrorMessage: string,
    loginRequest: boolean,
    loginFailed: boolean,
    loginErrorMessage: string,
    forgotPasswordRequest: boolean,
    forgotPasswordSuccess: boolean,
    forgotPasswordFailed: boolean,
    resetPasswordRequest: boolean,
    resetPasswordSuccess: boolean,
    resetPasswordFailed: boolean,
    resetPasswordErrorMessage: string,
    getUserRequest: boolean,
    getUserFailed: boolean,
    getUserErrorMessage: string,
    refreshTokenRequest: boolean,
    refreshTokenSuccess: boolean,
    refreshTokenFailed: boolean,
    refreshTokenErrorMessage: string,
    patchUserRequest: boolean,
    patchUserFailed: boolean,
    patchUserErrorMessage: string,
    logoutRequest: boolean,
    logoutFailed: boolean,
    logoutErrorMessage: string,
}

const initialState: TUserState = {
    user: {},
    isAuthorised: false,
    
    registerRequest: false,
    registerFailed: false,
    registerErrorMessage: '',
    loginRequest: false,
    loginFailed: false,
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
    getUserErrorMessage: '',
    refreshTokenRequest: false,
    refreshTokenSuccess: false,
    refreshTokenFailed: false,
    refreshTokenErrorMessage: '',
    patchUserRequest: false,
    patchUserFailed: false,
    patchUserErrorMessage: '',
    logoutRequest: false,
    logoutFailed: false,
    logoutErrorMessage: '',
}

export const userReducer = (state = initialState, action: TUserActions) => {
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
            };
        }
        case GET_USER_SUCCESS: {
            return {
                ...state,
                getUserRequest: false,
                getUserFailed: false,
                user: action.user,
                isAuthorised: true,
                getUserErrorMessage: '',
            };
        }
        case GET_USER_FAILED: {
            return {
                ...state,
                getUserFailed: true,
                getUserRequest: false,
                getUserErrorMessage: action.message,
            };
        }
        case REFRESH_TOKEN_REQUEST: {
            return {
                ...state,
                refreshTokenRequest: true,
            };
        }
        case REFRESH_TOKEN_SUCCESS: {
            return {
                ...state,
                refreshTokenRequest: false,
                refreshTokenFailed: false,
                refreshTokenSuccess: true,
                refreshTokenErrorMessage: '',
            };
        }
        case REFRESH_TOKEN_FAILED: {
            return {
                ...state,
                refreshTokenFailed: true,
                refreshTokenRequest: false,
                refreshTokenErrorMessage: action.message,
            };
        }
        case PATCH_USER_REQUEST: {
            return {
                ...state,
                patchUserRequest: true,
            };
        }
        case PATCH_USER_SUCCESS: {
            return {
                ...state,
                patchUserRequest: false,
                patchUserFailed: false,
                user: action.user,
                isAuthorised: true,
                patchUserErrorMessage: '',
            };
        }
        case PATCH_USER_FAILED: {
            return {
                ...state,
                patchUserFailed: true,
                patchUserRequest: false,
                patchUserErrorMessage: action.message,
            };
        }
        case LOGOUT_REQUEST: {
            return {
                ...state,
                logoutRequest: true,
            };
        }
        case LOGOUT_SUCCESS: {
            return {
                ...state,
                isAuthorised: false,
                user: {},
                logoutRequest: false,
                logoutFailed: false,
                logoutErrorMessage: '',
            };
        }
        case LOGOUT_FAILED: {
            return {
                ...state,
                logoutFailed: true,
                logoutRequest: false,
                logoutErrorMessage: action.message,
            };
        }
        default: {
            return state
        }
    }
}