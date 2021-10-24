import { BASE_URL, sendData, getResponse } from "./api";
import { getCookie } from "../utils/cookie";
import { TUserPathData, TUserRegisterData } from "./types/data";

export async function register(formData: TUserRegisterData) {
    const res = await sendData('/auth/register', formData);
    return getResponse(res);
}

export async function login(formData: { email: string; password: string; }) {
    const res = await sendData('/auth/login', formData);
    return getResponse(res);
}

export async function getUser() {
    const reqOptions: RequestInit = {
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
    const res = await fetch(BASE_URL + '/auth/user', reqOptions);
    return getResponse(res);
}

export async function refreshToken(tokenData: { token: string; }) {
    const res = await sendData('/auth/token', tokenData);
    return getResponse(res);
}

export async function patchUser(userData: TUserPathData) {
    const reqOptions: RequestInit = {
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
    const res = await fetch(BASE_URL + '/auth/user', reqOptions);
    return getResponse(res);
}

export function logout(tokenData) {
    return sendData('/auth/logout', tokenData).then(getResponse);
}

