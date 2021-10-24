import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    INCREASE_INGREDIENT_COUNT,
    DECREASE_INGREDIENT_COUNT,
    RESET_INGREDIENTS_COUNT
} from '../actions/burger-ingredients';
import { burgerIngredientsReducer } from './burger-ingredients';
import { TIngredient } from '../types/data';
import { TBurgerIngredientsState } from './burger-ingredients';

const initialState: TBurgerIngredientsState = {
    items: [],
    itemsRequest: false,
    itemsSuccess: false,
    itemsFailed: false,
};

const items: TIngredient[] = [
    {
        "_id": "60d3b41abdacab0026a733d1",
        "name": "Плоды Фалленианского дерева",
        "type": "main",
        "proteins": 20,
        "fat": 5,
        "carbohydrates": 55,
        "calories": 77,
        "price": 874,
        "image": "https://code.s3.yandex.net/react/code/sp_1.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/sp_1-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/sp_1-large.png",
        "__v": 0,
    },
    {
        "_id": "60d3b41abdacab0026a733ce",
        "name": "Соус традиционный галактический",
        "type": "sauce",
        "proteins": 42,
        "fat": 24,
        "carbohydrates": 42,
        "calories": 99,
        "price": 15,
        "image": "https://code.s3.yandex.net/react/code/sauce-03.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/sauce-03-large.png",
        "__v": 0,
    }
];

const bun: TIngredient = {
    "_id": "60d3b41abdacab0026a733c6",
    "name": "Краторная булка N-200i",
    "type": "bun",
    "proteins": 80,
    "fat": 24,
    "carbohydrates": 53,
    "calories": 420,
    "price": 1255,
    "image": "https://code.s3.yandex.net/react/code/bun-02.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
    "__v": 0,
};

describe('burger ingredients reducer', () => {
    it('should return initial state', () => {
        expect(burgerIngredientsReducer(undefined, {
            type: undefined
        })).toEqual(initialState);
    });

    it('should handle GET_INGREDIENTS_REQUEST', () => {
        expect(burgerIngredientsReducer(initialState, {
            type: GET_INGREDIENTS_REQUEST
        })).toEqual({
            ...initialState,
            itemsRequest: true,
        });

        expect(burgerIngredientsReducer({
            items: [ { ...items[0], count: 0 }, { ...items[1], count: 0 }, { ...bun, count: 0 } ] ,
            itemsRequest: false,
            itemsSuccess: true,
            itemsFailed: false,
        }, {
            type: GET_INGREDIENTS_REQUEST
        })).toEqual({
            items: [ { ...items[0], count: 0 }, { ...items[1], count: 0 }, { ...bun, count: 0 } ] ,
            itemsRequest: true,
            itemsSuccess: true,
            itemsFailed: false,
        });
    });

    it('should handle GET_INGREDIENTS_FAILED', () => {
        expect(burgerIngredientsReducer(initialState, {
            type: GET_INGREDIENTS_FAILED,
        })).toEqual({
            ...initialState,
            itemsFailed: true,
            itemsRequest: false
        });

        expect(burgerIngredientsReducer({
            items: [ { ...items[0], count: 0 }, { ...items[1], count: 0 }, { ...bun, count: 0 } ] ,
            itemsRequest: true,
            itemsSuccess: false,
            itemsFailed: false,
        }, {
            type: GET_INGREDIENTS_FAILED,
        })).toEqual({
            items: [ { ...items[0], count: 0 }, { ...items[1], count: 0 }, { ...bun, count: 0 } ] ,
            itemsRequest: false,
            itemsSuccess: false,
            itemsFailed: true,
        });
    });

    it('should set items (GET_INGREDIENTS_SUCCESS)', () => {
        expect(burgerIngredientsReducer(initialState, {
            type: GET_INGREDIENTS_SUCCESS,
            items: [...items, bun]
        })).toEqual({
            items: [ { ...items[0], count: 0 }, { ...items[1], count: 0 }, { ...bun, count: 0 } ] ,
            itemsRequest: false,
            itemsSuccess: true,
            itemsFailed: false,
        });

        expect(burgerIngredientsReducer({
            items: [ { ...items[0], count: 4 }, { ...items[1], count: 5 }, { ...bun, count: 2 } ] ,
            itemsRequest: false,
            itemsSuccess: true,
            itemsFailed: false,
        }, {
            type: GET_INGREDIENTS_SUCCESS,
            items: [...items, bun]
        })).toEqual({
            items: [ { ...items[0], count: 0 }, { ...items[1], count: 0 }, { ...bun, count: 0 } ] ,
            itemsRequest: false,
            itemsSuccess: true,
            itemsFailed: false,
        });
    });

    it('should increase count of item by 1', () => {
        expect(burgerIngredientsReducer({
            items: [ { ...items[0], count: 4 }, { ...items[1], count: 5 }, { ...bun, count: 0 } ] ,
            itemsRequest: false,
            itemsSuccess: true,
            itemsFailed: false,
        }, {
            type: INCREASE_INGREDIENT_COUNT,
            item: { ...items[0], uuid: '123'  }
        })).toEqual({
            items: [ { ...items[0], count: 5 }, { ...items[1], count: 5 }, { ...bun, count: 0 } ] ,
            itemsRequest: false,
            itemsSuccess: true,
            itemsFailed: false,
        });
    });

    it('should decrease count of item by 1', () => {
        expect(burgerIngredientsReducer({
            items: [ { ...items[0], count: 4 }, { ...items[1], count: 5 }, { ...bun, count: 2 } ] ,
            itemsRequest: false,
            itemsSuccess: true,
            itemsFailed: false,
        }, {
            type: DECREASE_INGREDIENT_COUNT,
            item: { ...items[1], uuid: '123' }
        })).toEqual({
            items: [ { ...items[0], count: 4 }, { ...items[1], count: 4 }, { ...bun, count: 2 } ] ,
            itemsRequest: false,
            itemsSuccess: true,
            itemsFailed: false,
        });
    });

    it('should increase count of item by 2 if item type is bun', () => {
        expect(burgerIngredientsReducer({
            items: [ { ...items[0], count: 4 }, { ...items[1], count: 5 }, { ...bun, count: 0 } ] ,
            itemsRequest: false,
            itemsSuccess: true,
            itemsFailed: false,
        }, {
            type: INCREASE_INGREDIENT_COUNT,
            item: { ...bun, uuid: '123' }
        })).toEqual({
            items: [ { ...items[0], count: 4 }, { ...items[1], count: 5 }, { ...bun, count: 2 } ] ,
            itemsRequest: false,
            itemsSuccess: true,
            itemsFailed: false,
        });
    });

    it('should reset all items count', () => {
        expect(burgerIngredientsReducer({
            items: [ { ...items[0], count: 4 }, { ...items[1], count: 5 }, { ...bun, count: 2 } ] ,
            itemsRequest: false,
            itemsSuccess: true,
            itemsFailed: false,
        }, {
            type: RESET_INGREDIENTS_COUNT
        })).toEqual({
            items: [ { ...items[0], count: 0 }, { ...items[1], count: 0 }, { ...bun, count: 0 } ] ,
            itemsRequest: false,
            itemsSuccess: true,
            itemsFailed: false,
        })
    })
})