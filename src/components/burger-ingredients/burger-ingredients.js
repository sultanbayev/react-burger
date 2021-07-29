import React, { useMemo } from "react";
import styles from './burger-ingredients.module.css';
import TabBar from './tab-bar/tab-bar';
import IngredientGroup from './ingredient-group/ingredient-group';
import data from '../../utils/data';

function BurgerIngredients() {

    const ingredients = useMemo(() => {
        return data.map(ingredient => ({...ingredient, count: 1}));
    }, [])

    const buns = useMemo(() => ingredients.filter((ingredient) => ingredient.type === 'bun'), [ingredients]);
    const sauces = useMemo(() => ingredients.filter((ingredient) => ingredient.type === 'sauce'), [ingredients]);
    const mains = useMemo(() => ingredients.filter((ingredient) => ingredient.type === 'main'), [ingredients]);

    return (
        <section className={styles.container}>
            <h1 className="text text_type_main-large mb-5 mt-10">Соберите бургер</h1>
            <TabBar />
            <section className={styles.ingredients}>
                <IngredientGroup id='buns' name="Булки" ingredients={buns} />
                <IngredientGroup id='sauces' name="Соусы" ingredients={sauces} />
                <IngredientGroup id='mains' name="Начинка" ingredients={mains} />
            </section>
        </section>
    );
}

export default BurgerIngredients;