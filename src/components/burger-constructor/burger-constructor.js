import React, { useState, useMemo, useContext, useEffect } from "react";
import { IngredientsContext } from "../app/context";
import styles from './burger-constructor.module.css';
import ComponentList from './component-list/component-list';
import OrderInfo from './order-info/order-info';

function BurgerConstructor() {
    const ingredientsState = useContext(IngredientsContext);
    
    const [components, setComponents] = useState({
        bun: null,
        staffings: null,
    });

    useEffect(() => {
        if (ingredientsState.success) {
            setComponents({
                ...components,
                bun: (() => {
                    const buns = ingredientsState.data.filter(i => i.type === 'bun');
                    return buns[Math.floor(Math.random() * buns.length)]
                })(),
                staffings: ingredientsState.data.filter(i => i.type !== 'bun').filter(() => Math.floor(Math.random() * 2) === 0),
            });
        } else {
            setComponents({
                ...components,
                bun: null,
                staffings: null,
            })
        }
    }, [ingredientsState]);

    const totalPrice = useMemo(() => {
        const bunPrice = components.bun ? components.bun.price * 2 : 0;
        const staffingsTotalPrice = components.staffings ? components.staffings.reduce((total, i) => total + i.price, 0) : 0;
        return bunPrice + staffingsTotalPrice;
    }, [components]);

    return (
        <section className={styles.burger_constructor}>
            <ComponentList components={components} />
            {components.staffings && components.staffings.length !== 0 && <OrderInfo total={totalPrice} />}
        </section>
    );
}

export default React.memo(BurgerConstructor);