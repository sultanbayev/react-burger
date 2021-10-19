import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    INCREASE_INGREDIENT_COUNT,
    DECREASE_INGREDIENT_COUNT,
    RESET_INGREDIENTS_COUNT
} from '../actions/burger-ingredients';
import { burgerIngredientsReducer } from './burger-ingredients';

const initialState = {
    items: [],
    itemsRequest: false,
    itemsSuccess: false,
    itemsFailed: false,
};

const items = [
    {
        "_id":"60d3b41abdacab0026a733c8",
        "name":"Филе Люминесцентного тетраодонтимформа",
        "type":"main",
    },
    {
        "_id":"60d3b41abdacab0026a733c9",
        "name":"Мясо бессмертных моллюсков Protostomia",
        "type":"main",
    }
];

const bun = {
    "_id":"60d3b41abdacab0026a733c6",
    "name":"Краторная булка N-200i",
    "type":"bun",
};

describe('burger ingredients reducer', () => {
    it('should return initial state', () => {
        expect(burgerIngredientsReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle GET_INGREDIENTS_REQUEST', () => {
        expect(burgerIngredientsReducer(initialState, {
            type: GET_INGREDIENTS_REQUEST
        })).toEqual({
            ...initialState,
            itemsRequest: true,
        });

        expect(burgerIngredientsReducer({
            items: items,
            itemsRequest: false,
            itemsSuccess: true,
            itemsFailed: false,
        }, {
            type: GET_INGREDIENTS_REQUEST
        })).toEqual({
            items: items,
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
            items: items,
            itemsRequest: true,
            itemsSuccess: false,
            itemsFailed: false,
        }, {
            type: GET_INGREDIENTS_FAILED,
        })).toEqual({
            items: items,
            itemsRequest: false,
            itemsSuccess: false,
            itemsFailed: true,
        });
    });

    it('should set items (GET_INGREDIENTS_SUCCESS)', () => {
        expect(burgerIngredientsReducer(initialState, {
            type: GET_INGREDIENTS_SUCCESS,
            items: [ ...items, bun ]
        })).toEqual({
            items: [
                { ...items[0], "count": 0 },
                { ...items[1], "count": 0 },
                { ...bun, "count": 0 },
            ],
            itemsRequest: false,
            itemsSuccess: true,
            itemsFailed: false,
        });

        expect(burgerIngredientsReducer({
            items: [
                { ...items[0], "count": 4 },
                { ...items[1], "count": 5 },
                { ...bun, "count": 2 },
            ],
            itemsRequest: false,
            itemsSuccess: true,
            itemsFailed: false,
        }, {
            type: GET_INGREDIENTS_SUCCESS,
            items: [ ...items, bun ]
        })).toEqual({
            items: [
                { ...items[0], "count": 0 },
                { ...items[1], "count": 0 },
                { ...bun, "count": 0 },
            ],
            itemsRequest: false,
            itemsSuccess: true,
            itemsFailed: false,
        });
    });

    it('should increase count of item by 1', () => {
        expect(burgerIngredientsReducer({
            items: [
                { ...items[0], "count": 4 },
                { ...items[1], "count": 5 },
                { ...bun, "count": 0 },
            ],
            itemsRequest: false,
            itemsSuccess: true,
            itemsFailed: false,
        }, {
            type: INCREASE_INGREDIENT_COUNT,
            item: items[0]
        })).toEqual({
            items: [
                { ...items[0], "count": 5 },
                { ...items[1], "count": 5 },
                { ...bun, "count": 0 },
            ],
            itemsRequest: false,
            itemsSuccess: true,
            itemsFailed: false,
        });
    });

    it('should decrease count of item by 1', () => {
        expect(burgerIngredientsReducer({
            items: [
                { ...items[0], "count": 4 },
                { ...items[1], "count": 5 },
                { ...bun, "count": 2 },
            ],
            itemsRequest: false,
            itemsSuccess: true,
            itemsFailed: false,
        }, {
            type: DECREASE_INGREDIENT_COUNT,
            item: items[1]
        })).toEqual({
            items: [
                { ...items[0], "count": 4 },
                { ...items[1], "count": 4 },
                { ...bun, "count": 2 },
            ],
            itemsRequest: false,
            itemsSuccess: true,
            itemsFailed: false,
        });
    });

    it('should increase count of item by 2 if item type is bun', () => {
        expect(burgerIngredientsReducer({
            items: [
                { ...items[0], "count": 4 },
                { ...items[1], "count": 5 },
                { ...bun, "count": 0 }
            ],
            itemsRequest: false,
            itemsSuccess: true,
            itemsFailed: false,
        }, {
            type: INCREASE_INGREDIENT_COUNT,
            item: bun
        })).toEqual({
            items: [
                { ...items[0], "count": 4 },
                { ...items[1], "count": 5 },
                { ...bun, "count": 2 }
            ],
            itemsRequest: false,
            itemsSuccess: true,
            itemsFailed: false,
        });
    });

    it('should reset all items count', () => {
        expect(burgerIngredientsReducer({
            items: [
                { ...items[0], "count": 4 },
                { ...items[1], "count": 5 },
                { ...bun, "count": 2 }
            ],
            itemsRequest: false,
            itemsSuccess: true,
            itemsFailed: false,
        }, {
            type: RESET_INGREDIENTS_COUNT
        })).toEqual({
            items: [
                { ...items[0], "count": 0 },
                { ...items[1], "count": 0 },
                { ...bun, "count": 0 }
            ],
            itemsRequest: false,
            itemsSuccess: true,
            itemsFailed: false,
        })
    })
})