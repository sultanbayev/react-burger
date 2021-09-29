import { forgotPassword, resetPassword } from '../../services/api';
import { register, login } from '../../services/auth';
import { setAccessCookie } from '../../utils/cookie';

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

export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILED = 'REFRESH_TOKEN_FAILED';
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

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

// export const checkUser = () => {
//     return (dispatch => {
//         dispatch({
//             type: GET_USER_REQUEST
//         });
//         getUser().then(res => {
//             if (res && res.success) {
//                 dispatch({
//                     type: GET_USER_SUCCESS,
//                     user: res.user
//                 });
//             } else {
//                 dispatch({ 
//                     type: GET_USER_FAILED
//                 });
//                 console.log(res);
//             }
//         }).catch(err => {
//             dispatch({
//                 type: GET_USER_FAILED
//             });
//             console.error(err);
//             if (err?.cause?.status === 403) {
//                 dispatch(refreshToken());
//             }
//         });
//     });
// }

// export const refreshToken = () => {
//     return (dispatch => {
//         dispatch({
//             type: REFRESH_TOKEN_REQUEST
//         });
//         const token = localStorage.getItem('refreshToken');
//         if (token) {
//             sendRefreshTokenRequest({ token: token })
//                 .then(res => {
//                     if (res && res.success) {
//                         setAccessCookie(res.accessToken);
//                         localStorage.setItem('refreshToken', res.refreshToken);
//                         dispatch({
//                             type: REFRESH_TOKEN_SUCCESS,
//                         });
//                     } else {
//                         dispatch({ 
//                             type: REFRESH_TOKEN_FAILED
//                         });
//                         console.log(res);
//                     }
//                 }).catch(err => {
//                     dispatch({
//                         type: REFRESH_TOKEN_FAILED
//                     });
//                     console.error(err);
//                 });
//         }
//     });
    
// }