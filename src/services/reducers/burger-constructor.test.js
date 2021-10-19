import {
    ADD_CONSTRUCTOR_COMPONENT,
    REMOVE_CONSTRUCTOR_COMPONENT,
    REORDER_CONSTRUCTOR_COMPONENTS,
    CLEAR_CONSTRUCTOR_COMPONENTS
} from '../actions/burger-constructor';
import {burgerConstructorReducer} from './burger-constructor';

const initialState = {
    bun: null,
    staffings: [],
};

const bun = {
    "_id":"60d3b41abdacab0026a733c6",
    "name":"Краторная булка N-200i",
    "type":"bun",
    "uuid":"a38cff3a-ce2d-45b0-923a-3d79681e1492"
};

const bun2 = {
    "_id":"60d3b41abdacab0026a733c7",
    "name":"Флюоресцентная булка R2-D3",
    "type":"bun",
    "uuid":"eae3436b-d17a-4e8a-be3b-1a25cb05ca68"
}

const staffing = {
    "_id":"60d3b41abdacab0026a733cb",
    "name":"Биокотлета из марсианской Магнолии",
    "type":"main",
    "uuid":"ddef9bda-3b0d-4bf3-8973-d0d54ff82fb0"
}

const staffings = [
    {
        "_id":"60d3b41abdacab0026a733c8",
        "name":"Филе Люминесцентного тетраодонтимформа",
        "type":"main",
        "uuid":"f95a1b30-d21a-478f-983f-a2f4e9da62d9"
    },
    {
        "_id":"60d3b41abdacab0026a733c9",
        "name":"Мясо бессмертных моллюсков Protostomia",
        "type":"main",
        "uuid":"2c915a27-56ff-48c8-8af0-0b054e0fdc6a"
    }
]

describe('burgerConstructor reducer', () => {
    it('should return the initial state', () => {
        expect(burgerConstructorReducer(undefined, {})).toEqual(initialState);
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