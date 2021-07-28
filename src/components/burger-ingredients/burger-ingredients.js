import React from "react";
import styles from './burger-ingredients.module.css';
import TabBar from './tab-bar/tab-bar';
import IngredientGroup from './ingredient-group/ingredient-group';
import data from '../../utils/data';

function BurgerIngredients() {
    const ingredients = data.map(ingredient => {
        return {
            ...ingredient,
            count: 1
        };
    })

    return (
        <section className={styles.container}>
            <h1 className="text text_type_main-large mb-5 mt-10">Соберите бургер</h1>
            <TabBar />
            <section className={styles.ingredients}>
                <IngredientGroup name="Булки" ingredients={ingredients.filter((ingredient) => ingredient.type === 'bun')} />
                <IngredientGroup name="Соусы" ingredients={ingredients.filter((ingredient) => ingredient.type === 'sauce')} />
                <IngredientGroup name="Начинка" ingredients={ingredients.filter((ingredient) => ingredient.type === 'main')} />
            </section>
        </section>
    );
}

export default BurgerIngredients;