import React, { useContext, useMemo, useReducer, useEffect, createContext, useCallback } from "react";
import styles from './burger-constructor.module.css';
import ComponentList from './component-list/component-list';
import OrderInfo from './order-info/order-info';
import { v4 as uuid } from 'uuid';
import reducer from "../../reducers/burger-constructor";
import { ADD_STAFFING, REMOVE_STAFFING, SET_BUN } from '../../constants/actions';
import { IngredientsContext } from "../app/app";

export const BurgerConstructorContext = createContext();

function BurgerConstructor() {
    const [componentsState, componentsStateDispatch] = useReducer(reducer, {
        bun: null,
        staffings: [],
    });

    const onStaffingAdd = useCallback((component) => {
        if (component.type === 'bun') return;
        const componentWithUuid = { ...component, uuid: uuid() };
        componentsStateDispatch({ type: ADD_STAFFING, payload: { toAdd: componentWithUuid } });
    }, []);

    const onStaffingRemove = useCallback((componentWithUuid) => {
        if (componentWithUuid.type === 'bun') return;
        componentsStateDispatch({ type: REMOVE_STAFFING, payload: { toRemove: componentWithUuid } });
    }, []);

    const onBunSet = useCallback((component) => {
        if (component.type !== 'bun') return;
        const componentWithUuid = { ...component, uuid: uuid() };
        componentsStateDispatch({ type: SET_BUN, payload: { bun: componentWithUuid }});
    }, []);

    const ingredientsState = useContext(IngredientsContext);

    useEffect(() => {
        if (ingredientsState.success) {
            const buns = ingredientsState.data.filter(c => c.type === 'bun')
            const bun = buns[Math.floor(Math.random() * buns.length)]
    
            onBunSet(bun);
    
            const staffings = ingredientsState.data
                .filter(c => c.type !== 'bun')
                .filter(() => Math.floor(Math.random() * 2) === 0);
            
            staffings.forEach(c => {
                onStaffingAdd(c);
            });
        }
    }, [ingredientsState])
    

    const totalPrice = useMemo(() => {
        const bunPrice = componentsState.bun ? componentsState.bun.price * 2 : 0;
        const staffingsTotalPrice = componentsState.staffings.reduce((total, i) => total + i.price, 0);
        return bunPrice + staffingsTotalPrice;
    }, [componentsState]);

    return (
        <section className={styles.burger_constructor}>
            <BurgerConstructorContext.Provider value={{ componentsState, onStaffingRemove }}>
                <ComponentList />
                <OrderInfo total={totalPrice} />
            </BurgerConstructorContext.Provider>
            
        </section>
    );
}

export default React.memo(BurgerConstructor);