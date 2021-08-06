import React, { useMemo } from "react";
import styles from './burger-ingredients.module.css';
import TabBar from './tab-bar/tab-bar';
import IngredientGroup from './ingredient-group/ingredient-group';
import PropTypes from 'prop-types';
import ingredientShape from "../../utils/prop-types";

function BurgerIngredients({ ingredients }) {

    const ingredientsWithCount = useMemo(() => {
        return ingredients.map(ingredient => ({...ingredient, count: 1}));
    }, [ingredients])

    const buns = useMemo(() => ingredientsWithCount.filter((ingredient) => ingredient.type === 'bun'), [ingredientsWithCount]);
    const sauces = useMemo(() => ingredientsWithCount.filter((ingredient) => ingredient.type === 'sauce'), [ingredientsWithCount]);
    const mains = useMemo(() => ingredientsWithCount.filter((ingredient) => ingredient.type === 'main'), [ingredientsWithCount]);

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

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.shape(ingredientShape).isRequired).isRequired,
}

export default BurgerIngredients;