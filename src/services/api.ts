import { getCookie } from '../utils/cookie';

export const BASE_URL = 'https://norma.nomoreparties.space/api' as const;

export function sendData(endpoint: string, data: any) {
    const reqOptions: RequestInit = {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data),
    };
    return fetch(BASE_URL + endpoint, reqOptions);
}

export function getResponse(res: Response) {
    return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
}

export async function sendOrder(ingredients: { ingredients: string[] }) {
    const reqOptions: RequestInit = {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + getCookie('accessToken'),
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(ingredients),
    }
    const res = await fetch(BASE_URL + '/orders', reqOptions);
    return getResponse(res);
}

export async function getIngredients() {
    const res = await fetch(BASE_URL + '/ingredients');
    return getResponse(res);
}

export async function forgotPassword(formData: { email: string }) {
    const res = await sendData('/password-reset', formData);
    return getResponse(res);
}

export async function resetPassword(formData: { token: string; password: string }) {
    const res = await sendData('/password-reset/reset', formData);
    return getResponse(res);
}