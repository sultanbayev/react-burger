import React from 'react';
import styles from './main.module.css';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import PropTypes from 'prop-types';
import ingredientShape from '../../utils/prop-types';

function Main({ingredients}) {

    return (
        <main className={styles.main}>
            <BurgerIngredients ingredients={ingredients} />
            <BurgerConstructor ingredients={ingredients} />
        </main>
    );
}

Main.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.shape(ingredientShape).isRequired).isRequired,
}

export default React.memo(Main);