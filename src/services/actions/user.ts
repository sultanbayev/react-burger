import { forgotPassword, resetPassword } from '../api';
import { register, login, getUser, refreshToken, patchUser, logout } from '../auth';
import { deleteCookie, setAccessCookie } from '../../utils/cookie';
import { clearComponentsAndResetCountsThunk } from './burger-constructor';
import { AppDispatch, AppThunk } from '../types';
import { TUser, TUserPathData, TUserRegisterData } from '../types/data';

export const REGISTER_REQUEST = 'REGISTER_REQUEST' as const;
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS' as const;
export const REGISTER_FAILED = 'REGISTER_FAILED' as const;
export const LOGIN_REQUEST = 'LOGIN_REQUEST' as const;
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS' as const;
export const LOGIN_FAILED = 'LOGIN_FAILED' as const;
export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST' as const;
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS' as const;
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED' as const;
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST' as const;
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS' as const;
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED' as const;
export const GET_USER_REQUEST = 'GET_USER_REQUEST' as const; 
export const GET_USER_SUCCESS = 'GET_USER_SUCESS' as const;
export const GET_USER_FAILED = 'GET_USER_FAILED' as const;
export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST' as const;
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS' as const;
export const REFRESH_TOKEN_FAILED = 'REFRESH_TOKEN_FAILED' as const;
export const PATCH_USER_REQUEST = 'PATCH_USER_REQUEST' as const;
export const PATCH_USER_SUCCESS = 'PATCH_USER_SUCCESS' as const;
export const PATCH_USER_FAILED = 'PATCH_USER_FAILED' as const;
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST' as const;
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS' as const;
export const LOGOUT_FAILED = 'LOGOUT_FAILED' as const;

interface IRegisterRequestAction {
    readonly type: typeof REGISTER_REQUEST
}

interface IRegisterSuccessAction {
    readonly type: typeof REGISTER_SUCCESS;
    readonly user: TUser;
}

interface IRegisterFailedAction {
    readonly type: typeof REGISTER_FAILED;
    readonly message: string;
}

interface ILoginRequestAction {
    readonly type: typeof LOGIN_REQUEST
}

interface ILoginSuccessAction {
    readonly type: typeof LOGIN_SUCCESS;
    readonly user: TUser;
}

interface ILoginFailedAction {
    readonly type: typeof LOGIN_FAILED;
    readonly message: string;
}

interface IForgotPasswordRequestAction {
    readonly type: typeof FORGOT_PASSWORD_REQUEST
}

interface IForgotPasswordSuccessAction {
    readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}

interface IForgotPasswordFailedAction {
    readonly type: typeof FORGOT_PASSWORD_FAILED
}

interface IResetPasswordRequestAction {
    readonly type: typeof RESET_PASSWORD_REQUEST
}

interface IResetPasswordSuccessAction {
    readonly type: typeof RESET_PASSWORD_SUCCESS;
}

interface IResetPasswordFailedAction {
    readonly type: typeof RESET_PASSWORD_FAILED;
    readonly message: string;
}

interface IGetUserRequestAction {
    readonly type: typeof GET_USER_REQUEST
}

interface IGetUserSuccessAction {
    readonly type: typeof GET_USER_SUCCESS;
    readonly user: TUser;
}

interface IGetUserFailedAction {
    readonly type: typeof GET_USER_FAILED;
    readonly message: string;
}

interface IRefreshTokenRequestAction {
    readonly type: typeof REFRESH_TOKEN_REQUEST
}

interface IRefreshTokenSuccessAction {
    readonly type: typeof REFRESH_TOKEN_SUCCESS;
}

interface IRefreshTokenFailedAction {
    readonly type: typeof REFRESH_TOKEN_FAILED;
    readonly message: string;
}

interface IPatchUserRequestAction {
    readonly type: typeof PATCH_USER_REQUEST
}

interface IPatchUserSuccessAction {
    readonly type: typeof PATCH_USER_SUCCESS;
    readonly user: TUser;
}

interface IPatchUserFailedAction {
    readonly type: typeof PATCH_USER_FAILED;
    readonly message: string;
}

interface ILogoutRequestAction {
    readonly type: typeof LOGOUT_REQUEST
}

interface ILogoutSuccessAction {
    readonly type: typeof LOGOUT_SUCCESS;
}

interface ILogoutFailedAction {
    readonly type: typeof LOGOUT_FAILED;
    readonly message: string;
}

interface IDefault {
    readonly type: undefined;
}

export type TUserActions =
    | IRegisterRequestAction
    | IRegisterSuccessAction
    | IRegisterFailedAction
    | ILoginRequestAction
    | ILoginSuccessAction
    | ILoginFailedAction
    | IForgotPasswordRequestAction
    | IForgotPasswordSuccessAction
    | IForgotPasswordFailedAction
    | IResetPasswordRequestAction
    | IResetPasswordSuccessAction
    | IResetPasswordFailedAction
    | IGetUserRequestAction
    | IGetUserSuccessAction
    | IGetUserFailedAction
    | IRefreshTokenRequestAction
    | IRefreshTokenSuccessAction
    | IRefreshTokenFailedAction
    | IPatchUserRequestAction
    | IPatchUserSuccessAction
    | IPatchUserFailedAction
    | ILogoutRequestAction
    | ILogoutSuccessAction
    | ILogoutFailedAction
    | IDefault


export const registerUserThunk: AppThunk = (formData: TUserRegisterData) =>
    (dispatch: AppDispatch) => {
        dispatch({
            type: REGISTER_REQUEST
        });
        register(formData)
            .then(res => {
                if (res.success) {
                    setAccessCookie(res.accessToken);
                    localStorage.setItem('refreshToken', res.refreshToken);
                    dispatch({
                        type: REGISTER_SUCCESS,
                        user: res.user
                    });
                }
            }).catch(err => {
                dispatch({
                    type: REGISTER_FAILED,
                    message: err.message,
                });
                console.error(err);
            });
    }

export const loginUserThunks: AppThunk = (formData: { email: string; password: string; }) =>
    (dispatch: AppDispatch) => {
        dispatch({
            type: LOGIN_REQUEST
        });
        login(formData)
            .then(res => {
                if (res.success) {
                    setAccessCookie(res.accessToken);
                    localStorage.setItem('refreshToken', res.refreshToken);
                    dispatch({
                        type: LOGIN_SUCCESS,
                        user: res.user
                    });
                }
            }).catch(err => {
                dispatch({
                    type: LOGIN_FAILED,
                    message: err.message,
                });
                console.error(err);
            });
    }

export const forgotUserPasswordThunk: AppThunk = (formData: { email: string }) => 
    (dispatch: AppDispatch) => {
        dispatch({
            type: FORGOT_PASSWORD_REQUEST
        });
        forgotPassword(formData)
            .then(res => {
                if (res.success) {
                    localStorage.setItem('isResetPassword', 'true');
                    dispatch({
                        type: FORGOT_PASSWORD_SUCCESS
                    });
                }
            }).catch(err => {
                dispatch({
                    type: FORGOT_PASSWORD_FAILED
                });
                console.error(err);
            });
    }

export const resetUserPasswordThunk: AppThunk = (formData: { token: string; password: string }) =>
    (dispatch: AppDispatch) => {
        dispatch({
            type: RESET_PASSWORD_REQUEST
        });
        resetPassword(formData)
            .then(res => {
                if (res.success) {
                    dispatch({
                        type: RESET_PASSWORD_SUCCESS,
                    });
                }
            }).catch(err => {
                dispatch({
                    type: RESET_PASSWORD_FAILED,
                    message: err.message
                });
                console.error(err);
            });
    }

export const getUserDataThunk: AppThunk = () =>
    (dispatch: AppDispatch | AppThunk) => {
        dispatch({
            type: GET_USER_REQUEST
        });
        getUser().then(res => {
            if (res.success) {
                localStorage.removeItem('isResetPassword');
                dispatch({
                    type: GET_USER_SUCCESS,
                    user: res.user
                });
            }
        }).catch(err => {
            if (err.message === "jwt expired" || err.message === "jwt malformed") {
                dispatch(refreshUserTokenThunk(getUserDataThunk));
            } else {
                dispatch({
                    type: GET_USER_FAILED,
                    message: err.message
                });
                console.error(err);
            }
        });
    }

export const refreshUserTokenThunk: AppThunk = (toDispatchAgain) =>
    (dispatch: AppDispatch) => {
        dispatch({
            type: REFRESH_TOKEN_REQUEST
        });
        const token = localStorage.getItem('refreshToken');
        if (token) {
            refreshToken({ token: token })
                .then(res => {
                    if (res.success) {
                        setAccessCookie(res.accessToken);
                        localStorage.setItem('refreshToken', res.refreshToken);
                        dispatch({
                            type: REFRESH_TOKEN_SUCCESS,
                        });
                        dispatch(toDispatchAgain());
                    }
                }).catch(err => {
                    dispatch({
                        type: REFRESH_TOKEN_FAILED,
                        message: err.message
                    });
                    console.error(err);
                });
        }
    }


export const patchUserDataThunk: AppThunk = (userData: TUserPathData) =>
    (dispatch: AppDispatch | AppThunk) => {
        dispatch({
            type: PATCH_USER_REQUEST
        });
        patchUser(userData).then(res => {
            if (res.success) {
                dispatch({
                    type: PATCH_USER_SUCCESS,
                    user: res.user
                });
            }
        }).catch(err => {
            if (err.message === "jwt expired" || err.message === "jwt malformed") {
                dispatch(refreshUserTokenThunk(getUserDataThunk));
            } else {
                dispatch({
                    type: PATCH_USER_FAILED,
                    message: err.message
                });
                console.error(err);
            }
        });
    }

export const logoutUserThunk: AppThunk = () =>
    (dispatch: AppDispatch | AppThunk) => {
        dispatch({
            type: LOGOUT_REQUEST
        });
        const token = localStorage.getItem('refreshToken');
        if (token) {
            logout({ token: token })
                .then(res => {
                    if (res.success) {
                        deleteCookie('accessToken');
                        localStorage.removeItem('refreshToken');
                        dispatch({
                            type: LOGOUT_SUCCESS,
                        });
                        dispatch(clearComponentsAndResetCountsThunk());
                    }
                }).catch(err => {
                    dispatch({
                        type: LOGOUT_FAILED,
                        message: err.message
                    });
                    console.error(err);
                });
        }
    }