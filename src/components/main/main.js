import React from 'react';
import styles from './main.module.css';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import components from '../../utils/components';

function Main() {

    return (
        <main className={styles.main}>
            <BurgerIngredients />
            <BurgerConstructor components={components} />
        </main>
    );
}

export default Main;