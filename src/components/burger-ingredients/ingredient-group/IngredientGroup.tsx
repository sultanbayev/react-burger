import React from "react";
import styles from './ingredient-group.module.css';
import PropTypes from 'prop-types';
import IngredientCard from "../ingredient-card/IngredientCard";

function IngredientGroup({ name, ingredients }) {

    return (
        <section >
            <h2 className="text text_type_main-medium mb-6">{name}</h2>
            <ul className={styles.list}>
                {
                    ingredients.map(ingredient =>
                        <li className={styles.item}>
                            <IngredientCard
                                key={ingredient._id}
                                name={ingredient.name}
                                image={ingredient.image}
                                price={ingredient.price}
                                count={ingredient.count}
                            />
                        </li>
                    )
                }
            </ul>
        </section>
    );
}

export default IngredientGroup;

IngredientGroup.propTypes = {
    name: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
}