import styles from './styles.module.css';
import { useCallback } from 'react';
import BurgerComponent from '../burger-component/burger-component';
import DummyComponent from '../dummy-component/dummy-component';
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import { addConstructorComponent, REORDER_CONSTRUCTOR_COMPONENTS } from "../../../services/actions/burger-constructor";
import { dndTypes } from "../../../utils/constants";
import { v4 as uuid } from 'uuid';

function ComponentList() {
    const dispatch = useDispatch();
    const { bun, staffings } = useSelector(store => store.burgerConstructor);

    const [, drop] = useDrop({
        accept: dndTypes.INGREDIENT,
        collect: monitor => ({
            isHover: monitor.isOver(),
        }),
        drop(item) {
            dispatch(addConstructorComponent({ ...item, uuid: uuid() }));
        },
    });

    const moveComponent = useCallback((dragIndex, hoverIndex) => {
        const reordered = [...staffings];
        const dragComponent = reordered[dragIndex];
        reordered.splice(dragIndex, 1);
        reordered.splice(hoverIndex, 0, dragComponent);
        dispatch({
                type: REORDER_CONSTRUCTOR_COMPONENTS,
                reordered: reordered,
            });
    //eslint-disable-next-line
    }, [staffings]);

    return (
        <ul ref={drop} className={`${styles.list} ${styles.outerList}`}>
            { bun ?
                <li className={styles.bun}>
                    <BurgerComponent
                        type="top"
                        isLocked={true}
                        component={{...bun, name: bun.name + ' (верх)' }}
                    />
                </li>
                :
                <li className={styles.dummy}>
                    <DummyComponent type={"top"}>Верхняя булка</DummyComponent>
                </li>
            }
            { (staffings && staffings.length)
                ? <li className={styles.ingredients_container}>
                    <ul className={styles.list}>
                        { staffings.map((component, index) => (
                            <li key={component.uuid} className={styles.staffing}>
                                <BurgerComponent component={component} index={index} moveComponent={moveComponent} />
                            </li> )   
                        )}
                    </ul>
                </li>
                : <li className={styles.dummy}>
                    <DummyComponent>Добавьте ингредиенты</DummyComponent>
                </li>
            }  
            { bun
                ? <li className={styles.bun}>
                    <BurgerComponent
                        type="bottom"
                        isLocked={true}
                        component={{...bun, name: bun.name + ' (низ)' }}                  
                    />
                </li>
                : <li className={styles.dummy}>
                    <DummyComponent type={"bottom"}>Нижняя булка</DummyComponent>
                </li>
            }
        </ul>
    );
}

export default ComponentList;