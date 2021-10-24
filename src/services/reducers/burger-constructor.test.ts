import {
    ADD_CONSTRUCTOR_COMPONENT,
    REMOVE_CONSTRUCTOR_COMPONENT,
    REORDER_CONSTRUCTOR_COMPONENTS,
    CLEAR_CONSTRUCTOR_COMPONENTS
} from '../actions/burger-constructor';
import { TIngredientWithUuid } from '../types/data';
import { TBurgerConstructorState, burgerConstructorReducer} from './burger-constructor';

const initialState: TBurgerConstructorState = {
    bun: null,
    staffings: [],
};

const bun: TIngredientWithUuid = {
    _id: '60d3b41abdacab0026a733c7',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
    __v: 0,
    uuid: '34a0eff7-25f6-4cf5-ab94-57af8fa40da3'
};

const bun2: TIngredientWithUuid = {
    _id: '60d3b41abdacab0026a733c6',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0,
    uuid: 'c2d7db81-c75f-4ea8-8eda-c741036d857d'
}

const staffing: TIngredientWithUuid = {
    _id: '60d3b41abdacab0026a733cb',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0,
    uuid: '8db4de59-f834-47be-8609-3c66e5c81b15'
}

const staffings: TIngredientWithUuid[] = [
    {
        _id: '60d3b41abdacab0026a733c9',
        name: 'Мясо бессмертных моллюсков Protostomia',
        type: 'main',
        proteins: 433,
        fat: 244,
        carbohydrates: 33,
        calories: 420,
        price: 1337,
        image: 'https://code.s3.yandex.net/react/code/meat-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
        __v: 0,
        uuid: 'c771f259-c150-4511-abc0-f8895161f22a'
    },
    {
        _id: '60d3b41abdacab0026a733c8',
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
        __v: 0,
        uuid: 'f70273dd-8ff0-4d26-82e7-9cd6170aa785'
    }
]

describe('burgerConstructor reducer', () => {
    it('should return the initial state', () => {
        expect(burgerConstructorReducer(undefined, {
            type: undefined
        })).toEqual(initialState);
    });

    it('should add bun component', () => {
        expect(burgerConstructorReducer(initialState, {
            type: ADD_CONSTRUCTOR_COMPONENT,
            item: bun
        })).toEqual({
            staffings: [],
            bun: bun
        });

        expect(burgerConstructorReducer({
            staffings: staffings,
            bun: bun
        }, {
            type: ADD_CONSTRUCTOR_COMPONENT,
            item: bun2
        })).toEqual({
            staffings: staffings,
            bun: bun2
        });
    });

    it('should add staffing component', () => {
        expect(burgerConstructorReducer(initialState, {
            type: ADD_CONSTRUCTOR_COMPONENT,
            item: staffing
        })).toEqual({
            staffings: [staffing],
            bun: null
        });

        expect(burgerConstructorReducer({
            staffings: staffings,
            bun: bun
        }, {
            type: ADD_CONSTRUCTOR_COMPONENT,
            item: staffing
        })).toEqual({
            staffings: [ ...staffings, staffing ],
            bun: bun
        });
    });

    it('should remove staffing component', () => {
        expect(burgerConstructorReducer({
            staffings: [ ...staffings, staffing ],
            bun: bun
        }, {
            type: REMOVE_CONSTRUCTOR_COMPONENT,
            item: staffing
        })).toEqual({
            staffings: [ ...staffings ],
            bun: bun
        });
    });

    it('should reorder staffing components', () => {
        expect(burgerConstructorReducer({
            staffings: [ ...staffings, staffing ],
            bun: bun
        }, {
            type: REORDER_CONSTRUCTOR_COMPONENTS,
            reordered: [ staffing, ...staffings ]
        })).toEqual({
            staffings: [ staffing, ...staffings ],
            bun: bun
        });
    });

    it('should clear all components', () => {
        expect(burgerConstructorReducer({
            staffings: [ ...staffings, staffing ],
            bun: bun
        }, {
            type: CLEAR_CONSTRUCTOR_COMPONENTS,
        })).toEqual(initialState);
    });
})