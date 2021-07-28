import React from "react";
import styles from './burger-constructor.module.css';
import PropTypes from 'prop-types';
import ComponentList from './component-list/component-list';
import OrderInfo from './order-info/order-info';

function BurgerConstructor({ components }) {
    const staffingPrice = components.staffing.reduce((total, component) => total + component.price, 0);
    const bunPrice = components.bun.price * 2;

    return (
        <section className={styles.burger_constructor}>
            <ComponentList components={components} />
            <OrderInfo total={staffingPrice + bunPrice} />
        </section>
    );
}

BurgerConstructor.propTypes = {
    components: PropTypes.shape({
        bun: PropTypes.object.isRequired,
        staffing: PropTypes.arrayOf(PropTypes.object).isRequired
    }).isRequired
}

export default BurgerConstructor;