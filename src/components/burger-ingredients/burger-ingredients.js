import React, { useContext, useMemo } from "react";
import styles from './burger-ingredients.module.css';
import TabBar from './tab-bar/tab-bar';
import IngredientGroup from './ingredient-group/ingredient-group';
import { IngredientsContext } from "../app/app";

function BurgerIngredients() {

    const ingredientsState = useContext(IngredientsContext);

    const ingredientsWithCount = useMemo(() => {
        return ingredientsState.data.map(i => ({...i, count: 1}));
    }, [ingredientsState])

    const buns = useMemo(() => ingredientsWithCount.filter(i => i.type === 'bun'), [ingredientsWithCount]);
    const sauces = useMemo(() => ingredientsWithCount.filter(i => i.type === 'sauce'), [ingredientsWithCount]);
    const mains = useMemo(() => ingredientsWithCount.filter(i => i.type === 'main'), [ingredientsWithCount]);

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