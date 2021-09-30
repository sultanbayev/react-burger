import { forgotPassword, resetPassword } from '../../services/api';
import { register, login, getUser, refreshToken, patchUser, logout } from '../../services/auth';
import { deleteCookie, setAccessCookie } from '../../utils/cookie';
import { clearComponentsAndResetCounts } from './burger-constructor';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';
export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILED = 'REFRESH_TOKEN_FAILED';
export const PATCH_USER_REQUEST = 'PATCH_USER_REQUEST';
export const PATCH_USER_SUCCESS = 'PATCH_USER_SUCCESS';
export const PATCH_USER_FAILED = 'PATCH_USER_FAILED';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const registerUser = (formData) => {
    return (dispatch) => {
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
}

export const loginUser = (formData) => {
    return (dispatch) => {
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
}

export const forgotUserPassword = (formData) => {
    return (dispatch => {
        dispatch({
            type: FORGOT_PASSWORD_REQUEST
        });
        forgotPassword(formData)
            .then(res => {
                if (res.success) {
                    localStorage.setItem('isResetPassword', true);
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
    }) 
}

export const resetUserPassword = (formData) => {
    return (dispatch => {
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
    });
}

export const getUserData = () => {
    return (dispatch => {
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
                dispatch(refreshUserToken(getUserData));
            } else {
                dispatch({
                    type: GET_USER_FAILED,
                    message: err.message
                });
                console.error(err);
            }
        });
    });
}

export const refreshUserToken = (toDispatchAgain) => {
    return (dispatch => {
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
    });
}

export const patchUserData = (userData) => {
    return (dispatch => {
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
                dispatch(refreshUserToken(getUserData));
            } else {
                dispatch({
                    type: PATCH_USER_FAILED,
                    message: err.message
                });
                console.error(err);
            }
        });
    });
}

export const logoutUser = () => {
    return (dispatch => {
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
                        dispatch(clearComponentsAndResetCounts());
                    }
                }).catch(err => {
                    dispatch({
                        type: LOGOUT_FAILED,
                        message: err.message
                    });
                    console.error(err);
                });
        }
    });
}