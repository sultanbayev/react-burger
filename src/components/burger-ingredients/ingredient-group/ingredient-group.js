import React from "react";
import styles from './ingredient-group.module.css';
import PropTypes from 'prop-types';
import IngredientCard from "../ingredient-card/ingredient-card";
import ingredientShape from "../../../utils/prop-types";

function IngredientGroup({ name, id, ingredients }) {

    return (
        <section >
            <h2 id={id} className="text text_type_main-medium mb-6">{name}</h2>
            <ul className={styles.list}>
                {   
                    ingredients.length === 0 ?
                        ( <p className="text text_type_main-default">Ой, похоже ничего нет...</p> )
                    :
                        ( ingredients.map((ingredient, key) =>
                            <li key={key} className={styles.item}>
                                <IngredientCard
                                    ingredient={ingredient}
                                />
                            </li>
                        ) )
                }
            </ul>
        </section>
    );
}

IngredientGroup.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.shape({
        ...ingredientShape,
        count: PropTypes.number.isRequired
    }).isRequired).isRequired,
}

export default React.memo(IngredientGroup);

