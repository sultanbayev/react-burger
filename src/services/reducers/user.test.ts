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
    LOGOUT_FAILED
} from '../actions/user';
import { userReducer, TUserState } from './user';

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
};

const user = {
    "email": 'sultanbayev@gmail.com',
    "name": 'Ербол123'
}

describe('user reducer', () => {
    it('should return initial state', () => {
        expect(userReducer(undefined, { type: undefined })).toEqual(initialState);
    });

    it('should handle REGISTER_REQUEST', () => {
        expect(userReducer(initialState, {
            type: REGISTER_REQUEST
        })).toEqual({
            ...initialState,
            registerRequest: true
        });
    });

    it('should handle REGISTER_SUCCESS', () => {
        expect(userReducer(initialState, {
            type: REGISTER_SUCCESS,
            user: user
        })).toEqual({
            ...initialState,
            registerRequestFailed: false,
            isAuthorised: true,
            user: user,
            registerRequest: false,
            registerErrorMessage: '',
        });
    });

    it('should handle REGISTER_FAILED', () => {
        expect(userReducer(initialState, {
            type: REGISTER_FAILED,
            message: 'ошибка'
        })).toEqual({
            ...initialState,
            registerRequestFailed: true,
            registerRequest: false,
            registerErrorMessage: 'ошибка',
        });
    });

    it('should handle LOGIN_REQUEST', () => {
        expect(userReducer(initialState, {
            type: LOGIN_REQUEST
        })).toEqual({
            ...initialState,
            loginRequest: true
        });
    });

    it('should handle LOGIN_SUCCESS', () => {
        expect(userReducer(initialState, {
            type: LOGIN_SUCCESS,
            user: user
        })).toEqual({
            ...initialState,
            loginRequestFailed: false,
            loginRequest: false,
            user: user,
            isAuthorised: true,
            loginErrorMessage: '',
        });
    });

    it('should handle LOGIN_FAILED', () => {
        expect(userReducer(initialState, {
            type: LOGIN_FAILED,
            message: 'ошибка'
        })).toEqual({
            ...initialState,
            loginRequestFailed: true,
            loginRequest: false,
            loginErrorMessage: 'ошибка',
        });
    });

    it('should handle FORGOT_PASSWORD_REQUEST', () => {
        expect(userReducer(initialState, {
            type: FORGOT_PASSWORD_REQUEST
        })).toEqual({
            ...initialState,
            forgotPasswordRequest: true,
        });
    });

    it('should handle FORGOT_PASSWORD_SUCCESS', () => {
        expect(userReducer(initialState, {
            type: FORGOT_PASSWORD_SUCCESS,
        })).toEqual({
            ...initialState,
            forgotPasswordSuccess: true,
            forgotPasswordRequest: false,
            forgotPasswordFailed: false,
        });
    });

    it('should handle FORGOT_PASSWORD_FAILED', () => {
        expect(userReducer(initialState, {
            type: FORGOT_PASSWORD_FAILED,
        })).toEqual({
            ...initialState,
            forgotPasswordFailed: true,
            forgotPasswordRequest: false,
        });
    });

    it('should handle RESET_PASSWORD_REQUEST', () => {
        expect(userReducer(initialState, {
            type: RESET_PASSWORD_REQUEST
        })).toEqual({
            ...initialState,
            resetPasswordRequest: true,
        });
    });

    it('should handle RESET_PASSWORD_SUCCESS', () => {
        expect(userReducer(initialState, {
            type: RESET_PASSWORD_SUCCESS,
        })).toEqual({
            ...initialState,
            resetPasswordSuccess: true,
            resetPasswordRequest: false,
            resetPasswordFailed: false,
            resetPasswordErrorMessage: '',
        });
    });

    it('should handle RESET_PASSWORD_FAILED', () => {
        expect(userReducer(initialState, {
            type: RESET_PASSWORD_FAILED,
            message: 'ошибка'
        })).toEqual({
            ...initialState,
            resetPasswordFailed: true,
            resetPasswordRequest: false,
            resetPasswordErrorMessage: 'ошибка',
        });
    });

    it('should handle GET_USER_REQUEST', () => {
        expect(userReducer(initialState, {
            type: GET_USER_REQUEST
        })).toEqual({
            ...initialState,
            getUserRequest: true,
        });
    });

    it('should handle GET_USER_SUCCESS', () => {
        expect(userReducer(initialState, {
            type: GET_USER_SUCCESS,
            user: user
        })).toEqual({
            ...initialState,
            getUserRequest: false,
            getUserFailed: false,
            user: user,
            isAuthorised: true,
            getUserErrorMessage: '',
        });
    });

    it('should handle GET_USER_FAILED', () => {
        expect(userReducer(initialState, {
            type: GET_USER_FAILED,
            message: 'ошибка'
        })).toEqual({
            ...initialState,
            getUserFailed: true,
            getUserRequest: false,
            getUserErrorMessage: 'ошибка',
        });
    });

    it('should handle REFRESH_TOKEN_REQUEST', () => {
        expect(userReducer(initialState, {
            type: REFRESH_TOKEN_REQUEST
        })).toEqual({
            ...initialState,
            refreshTokenRequest: true,
        });
    });

    it('should handle REFRESH_TOKEN_SUCCESS', () => {
        expect(userReducer(initialState, {
            type: REFRESH_TOKEN_SUCCESS
        })).toEqual({
            ...initialState,
            refreshTokenRequest: false,
            refreshTokenFailed: false,
            refreshTokenSuccess: true,
            refreshTokenErrorMessage: '',
        });
    });

    it('should handle REFRESH_TOKEN_FAILED', () => {
        expect(userReducer(initialState, {
            type: REFRESH_TOKEN_FAILED,
            message: 'ошибка'
        })).toEqual({
            ...initialState,
            refreshTokenFailed: true,
            refreshTokenRequest: false,
            refreshTokenErrorMessage: 'ошибка',
        });
    });

    it('should handle PATCH_USER_REQUEST', () => {
        expect(userReducer(initialState, {
            type: PATCH_USER_REQUEST
        })).toEqual({
            ...initialState,
            patchUserRequest: true,
        });
    });

    it('should handle PATCH_USER_SUCCESS', () => {
        expect(userReducer(initialState, {
            type: PATCH_USER_SUCCESS,
            user: user
        })).toEqual({
            ...initialState,
            patchUserRequest: false,
            patchUserFailed: false,
            user: user,
            isAuthorised: true,
            patchUserErrorMessage: '',
        });
    });

    it('should handle PATCH_USER_FAILED', () => {
        expect(userReducer(initialState, {
            type: PATCH_USER_FAILED,
            message: 'ошибка'
        })).toEqual({
            ...initialState,
            patchUserFailed: true,
            patchUserRequest: false,
            patchUserErrorMessage: 'ошибка',
        });
    });

    it('should handle LOGOUT_REQUEST', () => {
        expect(userReducer(initialState, {
            type: LOGOUT_REQUEST
        })).toEqual({
            ...initialState,
            logoutRequest: true,
        });
    });

    it('should handle LOGOUT_SUCCESS', () => {
        expect(userReducer(initialState, {
            type: LOGOUT_SUCCESS
        })).toEqual({
            ...initialState,
            isAuthorised: false,
            user: {},
            logoutRequest: false,
            logoutFailed: false,
            logoutErrorMessage: '',
        });
    });

    it('should handle LOGOUT_FAILED', () => {
        expect(userReducer(initialState, {
            type: LOGOUT_FAILED,
            message: 'ошибка'
        })).toEqual({
            ...initialState,
            logoutFailed: true,
            logoutRequest: false,
            logoutErrorMessage: 'ошибка',
        });
    });

});