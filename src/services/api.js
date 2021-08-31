import { BASE_URL } from "../utils/constants";

const getResponse = (response) => {
    if (response.ok) {
        return response.json()
    } else {
        return Promise.reject('Статус пришел не ОК. Ошибка: ' + response.status);
    }
}

export const getOrderNumber = (data) => {
    const request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ingredients: data
        }),
    };
    const url = BASE_URL + '/orders/';
    return fetch(url, request).then(getResponse);
}

export const getIngredients = () => {
    const request = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    const url = BASE_URL + '/ingredients/';
    return fetch(url, request).then(getResponse);
}