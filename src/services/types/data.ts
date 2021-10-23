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
