export type TIngredient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
}

export type TIngredientWithCount = TIngredient & {
    count: number;
}

export type TIngredientWithUuid = TIngredient & {
    uuid: string;
}

export type TOrder = {
    _id: string;
    ingredients: string[];
    status: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
}

export type TPayload = {
    orders: TOrder[];
    total: number;
    totalToday: number;
}

export type TUserPathData = {
    email?: string;
    name?: string;
    password?: string;
}

export type TUserRegisterData = {
    email: string;
    name: string;
    password: string;
}

export type TUser = {
    email: string;
    name: string;
}

export type TLink = {
    id: number;
    to: string;
    text: string;
    desc: string;
}