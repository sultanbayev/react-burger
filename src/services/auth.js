import { BASE_URL, sendData, getResponse } from "./api";
import { getCookie } from "../utils/cookie";

export function register(formData) {
    return sendData('/auth/register', formData).then(getResponse);
}

export function login(formData) {
    return sendData('/auth/login', formData).then(getResponse);
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
    return fetch(BASE_URL + '/auth/user', reqOptions).then(getResponse);
}

export function refreshToken(tokenData) {
    return sendData('/auth/token', tokenData).then(getResponse);
}

export function patchUser(userData) {
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
        body: JSON.stringify(userData)
    };
    return fetch(BASE_URL + '/auth/user', reqOptions).then(getResponse);
}

export function logout(tokenData) {
    return sendData('/auth/logout', tokenData).then(getResponse);
}

