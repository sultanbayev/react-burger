import React from 'react';
import styles from './main.module.css';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

function Main() {

    return (
        <main className={styles.main}>
            <BurgerIngredients />
            <BurgerConstructor />
        </main>
    );
}

export default React.memo(Main);