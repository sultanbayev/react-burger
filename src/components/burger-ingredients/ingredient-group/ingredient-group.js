import React, { useEffect, useRef } from "react";
import styles from './styles.module.css';
import IngredientCard from "../ingredient-card/ingredient-card";
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';
import { ingredientShape } from "../../../utils/prop-types";

function IngredientGroup({ name, id, items, setHeight }) {

    const itemsRequest = useSelector(store => store.burgerIngredients.itemsRequest);

    const groupRef = useRef(null);

    useEffect(() => {
        const height = groupRef.current.getBoundingClientRect().height;
        setHeight(height);
    }, [items])

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

IngredientGroup.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
        ...ingredientShape,
    }).isRequired).isRequired,
    setHeight: PropTypes.func.isRequired,
}

export default React.memo(IngredientGroup);

