import { getCookie } from "../utils/cookie";

export const BASE_URL = 'https://norma.nomoreparties.space/api';

export function sendData(endpoint, form) {
    const reqOptions = {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(form),
    };
    return fetch(BASE_URL + endpoint, reqOptions);
}

export function getResponse(res) {
    return res.ok
        ? res.json()
        : Promise.reject('Статус пришел не ОК. Ошибка: ' + res.status);
}

export function sendOrderNumberRequest(ingredients) {
    return sendData('/orders', ingredients).then(res => getResponse(res));
}

export function getIngredients() {
    return fetch(BASE_URL + '/ingredients').then(res => getResponse(res));
}

export function sendRegisterRequest(formData) {
    return sendData('/auth/register', formData).then(res => getResponse(res));
}

export function getUser() {
    const reqOptions = {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + getCookie('accessToken')
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    }
    return fetch(BASE_URL + '/auth/user', reqOptions).then(res => getResponse(res));
}

export function sendLoginREquest(formData) {
    return sendData('/auth/login', formData).then(res => getResponse(res));
}

export function sendLogoutRequest(token) {
    return sendData('/auth/logout', token).then(res => getResponse(res));
}

export function sendResetPasswordRequest(formData) {
    return sendData('/password-reset', formData).then(res => getResponse(res));
}

export function sendRestorePasswordRequest(formData) {
    return sendData('/password-reset/reset', formData).then(res => getResponse(res))
}

export function patchUser(data) {
    const reqOptions = {
        method: 'PATCH',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + getCookie('accessToken')
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    };
    return fetch(BASE_URL + '/auth/user', reqOptions).then(res => getResponse(res));
}

export function sendRefreshTokenRequest(token) {
    return sendData('/auth/token', token).then(res => getResponse(res));
}