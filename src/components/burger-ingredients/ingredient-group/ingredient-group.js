import React from "react";
import styles from './ingredient-group.module.css';
import PropTypes from 'prop-types';
import IngredientCard from "../ingredient-card/ingredient-card";
import ingredientShape from "../../../utils/prop-types";

function IngredientGroup({ name, id, ingredients, onModalOpen }) {

    return (
        <section >
            <h2 id={id} className="text text_type_main-medium mb-6">{name}</h2>
            <ul className={styles.list}>
                {
                    ingredients.map((ingredient, key) =>
                        <li key={key} className={styles.item}>
                            <IngredientCard
                                name={ingredient.name}
                                image={ingredient.image}
                                price={ingredient.price}
                                count={ingredient.count}
                                onModalOpen={onModalOpen}
                            />
                        </li>
                    )
                }
            </ul>
        </section>
    );
}

export default React.memo(IngredientGroup);

IngredientGroup.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.shape(ingredientShape).isRequired).isRequired,
    onModalOpen: PropTypes.func.isRequired
}