import styles from './styles.module.css';
import BurgerComponent from '../burger-component/burger-component';
import DummyComponent from '../dummy-component/dummy-component';
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import { addConstructorComponent } from "../../../redux/actions/burger-constructor";
import { dndTypes } from "../../../utils/constants";

function ComponentList() {
    const dispatch = useDispatch();
    const burgerConstructor = useSelector(store => store.burgerConstructor);

    const [, drop] = useDrop({
        accept: dndTypes.INGREDIENT,
        collect: monitor => ({
            isHover: monitor.isOver(),
        }),
        drop(item) {
            dispatch(addConstructorComponent(item));
        },
    });

    return (
        <ul ref={drop} className={[styles.list, styles.outerList].join(' ')}>
            { burgerConstructor.bun ?
                <li className={styles.bun}>
                    <BurgerComponent
                        type="top"
                        isLocked={true}
                        item={{...burgerConstructor.bun, name: burgerConstructor.bun.name + ' (верх)' }}
                    />
                </li>
                :
                <li className={styles.dummy}>
                    <DummyComponent type={"top"}>Верхняя булка...</DummyComponent>
                </li>
            }
            { (burgerConstructor.staffings && burgerConstructor.staffings.length !== 0) ?
                <li className={styles.ingredients_container}>
                    <ul className={styles.list}>
                        { burgerConstructor.staffings.map((item, key) => 
                            <li key={key} className={styles.staffing}>
                                <BurgerComponent
                                    item={item}                    
                                />
                            </li>
                        )}
                    </ul>
                </li>
                : 
                <li className={styles.dummy}>
                    <DummyComponent>Начните перетаскивать ингредиенты...</DummyComponent>
                </li>
            }  
            { burgerConstructor.bun ?
                <li className={styles.bun}>
                    <BurgerComponent
                        type="bottom"
                        isLocked={true}
                        item={{...burgerConstructor.bun, name: burgerConstructor.bun.name + ' (низ)' }}                  
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

export default ComponentList;