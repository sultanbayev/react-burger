import React, { useEffect, useRef, FC } from "react";
import styles from './styles.module.css';
import IngredientCard from "../ingredient-card/ingredient-card";
import { useSelector } from '../../../services/hooks';
import { TIngredientWithCount } from "../../../services/types/data";

interface IIngredientGroup {
    name: string;
    id: string;
    items: TIngredientWithCount[];
    setHeight: (height: number) => void;
}

const IngredientGroup: FC<IIngredientGroup> = ({ name, id, items, setHeight }) => {

    const { itemsRequest } = useSelector(store => store.burgerIngredients);
    const groupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (groupRef && groupRef.current) {
            const height = groupRef.current.getBoundingClientRect().height;
            setHeight(height);
        }
    // eslint-disable-next-line
    }, [items]);

    return (
        <section ref={groupRef}>
            <h2 id={id} className="text text_type_main-medium mb-6">{name}</h2>
            { itemsRequest
                ? <p className="text text_type_main-default mb-10">Загрузка...</p>
                : <ul className={styles.list}>
                    {   
                        items.length === 0
                        ? <p className="text text_type_main-default">Ой, похоже ничего нет...</p>
                        : items.map((ingredient, key) => {
                            return <li key={key} className={styles.item}>
                                    <IngredientCard ingredient={ingredient} />
                                </li>
                        })
                    }
                </ul>
            }
        </section>
    );
}

export default React.memo(IngredientGroup);

