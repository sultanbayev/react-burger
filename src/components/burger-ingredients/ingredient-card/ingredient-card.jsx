import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientShape } from '../../../utils/prop-types';
import { useDrag } from 'react-dnd';
import { dndTypes } from '../../../utils/constants';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function IngredientCard({ ingredient }) {

    const location = useLocation();

    const [, drag] = useDrag({
        type: dndTypes.INGREDIENT,
        item: ingredient,
    });

    return (
        <article ref={drag} className={styles.card}>
            <Link
                to={{
                    pathname: `/ingredient/${ingredient._id}`,
                    state: {
                        background: location,
                        ingredient: ingredient
                     },
                }} >
                <img className={styles.image} src={ingredient.image} alt={ingredient.name} />
            </Link>
                <div className={styles.price}>
                    <p className="text text_type_digits-default mr-2">{ingredient.price}</p>
                    <CurrencyIcon type="primary" />
                </div>
            <Link
                to={{
                    pathname: `/ingredient/${ingredient._id}`,
                    state: {
                        background: location,
                        ingredient: ingredient
                        },
                }} >
                <div className={styles.name}>
                    <h3 className="text text_type_main-default">{ingredient.name}</h3>
                </div>
            </Link>
            { (!!ingredient.count && ingredient.count !== 0) && <Counter count={ingredient.count} size="default" />}
        </article>
    );
}

IngredientCard.propTypes = {
    ingredient: PropTypes.shape({
        ...ingredientShape,
        count: PropTypes.number.isRequired
    }).isRequired,
}

export default React.memo(IngredientCard);