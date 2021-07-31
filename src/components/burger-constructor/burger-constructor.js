import React, { useMemo } from "react";
import styles from './burger-constructor.module.css';
import PropTypes from 'prop-types';
import ComponentList from './component-list/component-list';
import OrderInfo from './order-info/order-info';
import ingredientShape from '../../utils/prop-types';
import components from '../../utils/components';

function BurgerConstructor({ingredients, onModalOpen}) {

    const price = useMemo(() => {
        const ingredientsPrice = components.ingredients.reduce((total, component) => total + component.price, 0);
        const bunPrice = components.bun.price * 2;
        return ingredientsPrice + bunPrice;
    }, [])
    

    return (
        <section className={styles.burger_constructor}>
            <ComponentList components={components} />
            <OrderInfo onModalOpen={onModalOpen} total={price} />
        </section>
    );
}

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.shape(ingredientShape).isRequired).isRequired,
    onModalOpen: PropTypes.func.isRequired
}

export default React.memo(BurgerConstructor);