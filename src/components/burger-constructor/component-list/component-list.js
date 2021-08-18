import React, { useContext } from "react";
import styles from './component-list.module.css';
import BurgerComponent from '../burger-component/burger-component';
import DummyComponent from '../dummy-component/dummy-component';
import { BurgerConstructorContext } from "../../../contexts";

function ComponentList() {

    const { componentsState } = useContext(BurgerConstructorContext)

    return (
        <ul className={[styles.list, styles.outerList].join(' ')}>
            { componentsState.bun ?
                <li className={styles.bun}>
                    <BurgerComponent
                        type="top"
                        isLocked={true}
                        component={{...componentsState.bun, name: componentsState.bun.name + ' (верх)' }}
                    />
                </li>
                :
                <li className={styles.dummy}>
                    <DummyComponent type={"top"}>Верхняя булка...</DummyComponent>
                </li>
            }
            { (componentsState.staffings && componentsState.staffings.length !== 0) ?
                <li className={styles.ingredients_container}>
                    <ul className={styles.list}>
                        { componentsState.staffings.map((component, key) => 
                            <li key={key} className={styles.staffing}>
                                <BurgerComponent
                                    component={component}                    
                                />
                            </li>
                        )}
                    </ul>
                </li>
                : 
                <li className={styles.dummy}>
                    <DummyComponent>Основные ингредиенты и соусы...</DummyComponent>
                </li>
            }  
            { componentsState.bun ?
                <li className={styles.bun}>
                    <BurgerComponent
                        type="bottom"
                        isLocked={true}
                        component={{...componentsState.bun, name: componentsState.bun.name + ' (низ)' }}                  
                    />
                </li>
                :
                <li className={styles.dummy}>
                    <DummyComponent type={"bottom"}>Нижняя булка...</DummyComponent>
                </li>
            }
        </ul>
    );
}

export default React.memo(ComponentList);