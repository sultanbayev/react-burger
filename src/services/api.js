export const BASE_URL = 'https://norma.nomoreparties.space/api';

export function sendData(endpoint, data) {
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
        body: JSON.stringify(data),
    };
    return fetch(BASE_URL + endpoint, reqOptions);
}

export function getResponse(res) {
    return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
}

export function sendOrderNumberRequest(ingredients) {
    return sendData('/orders', ingredients).then(res => getResponse(res));
}

export function getIngredients() {
    return fetch(BASE_URL + '/ingredients').then(res => getResponse(res));
}

export function forgotPassword(formData) {
    return sendData('/password-reset', formData).then(getResponse);
}

export function resetPassword(formData) {
    return sendData('/password-reset/reset', formData).then(getResponse)
}