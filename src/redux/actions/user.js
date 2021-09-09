import { login, register, resetPassword } from '../../services/api';
import { setAccessCookie, setRefreshCookie } from '../../utils/cookie';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

export const registerUser = (formData) => {
    return (dispatch) => {
        dispatch({
            type: REGISTER_REQUEST
        });
        register(formData)
            .then(res => {
                if (res && res.success) {
                    res.accessToken && setAccessCookie(res.accessToken);
                    res.refreshToken && setRefreshCookie(res.refreshToken);
                    dispatch({
                        type: REGISTER_SUCCESS,
                        user: res.user
                    });
                } else {
                    dispatch({ 
                        type: REGISTER_FAILED
                    });
                    console.log(res);
                }
            })
            .catch(err => {
                dispatch({
                    type: REGISTER_FAILED
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
                if (res && res.success) {
                    res.accessToken && setAccessCookie(res.accessToken);
                    res.refreshToken && setRefreshCookie(res.refreshToken);
                    dispatch({
                        type: LOGIN_SUCCESS,
                        user: res.user
                    });
                } else {
                    dispatch({ 
                        type: LOGIN_FAILED
                    });
                    console.log(res);
                }
            })
        .catch(err => {
            dispatch({
                type: LOGIN_FAILED
            });
            console.error(err);
        });
    }
}

export const forgotUserPassword = (formData) => {
    return (dispatch => {
        dispatch({
            type: RESET_PASSWORD_REQUEST
        });
        resetPassword(formData)
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: RESET_PASSWORD_SUCCESS
                    });
                } else {
                    dispatch({ 
                        type: RESET_PASSWORD_FAILED
                    });
                    console.log(res);
                }
            })
            .catch(err => {
                dispatch({
                    type: RESET_PASSWORD_FAILED
                });
                console.error(err);
            });
    }) 
}