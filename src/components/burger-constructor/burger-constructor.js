import React, { useState, useMemo, useContext, useEffect } from "react";
import { IngredientsContext } from "../app/context";
import styles from './burger-constructor.module.css';
import ComponentList from './component-list/component-list';
import OrderInfo from './order-info/order-info';

function BurgerConstructor() {
    const ingredients = useContext(IngredientsContext);
    const [components, setComponents] = useState({
        bun: null,
        staffings: []
    });

    useEffect(() => {
        setComponents({
            bun: (() => {
                const buns = ingredients.filter(i => i.type === 'bun');
                return buns[Math.floor(Math.random() * buns.length)]
            })(),
            staffings: ingredients.filter(i => i.type !== 'bun').filter(() => Math.floor(Math.random() * 2) === 0),
        });
    }, [ingredients]);

    const totalPrice = useMemo(() => {
        const bunPrice = components.bun ? components.bun.price * 2 : 0;
        const staffingsTotalPrice = components.staffings.reduce((total, i) => total + i.price, 0);
        return bunPrice + staffingsTotalPrice;
    }, [components]);

    return (
        <section className={styles.burger_constructor}>
            <ComponentList components={components} />
            {components.staffings.length !== 0 && <OrderInfo total={totalPrice} />}
        </section>
    );
}

export default React.memo(BurgerConstructor);