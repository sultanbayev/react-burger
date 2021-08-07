import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styles from './ingredient-card.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientShape } from '../../../utils/prop-types';
import IngredientDetails from '../../modal/ingredient-details/ingredient-details';
import { ModalContext } from '../../app/app';

function IngredientCard({ ingredient }) {

    const {onModalOpen} = useContext(ModalContext)

    const onClick = () => {
        onModalOpen(<IngredientDetails
            name={ingredient.name}
            image={ingredient.image_large}
            calories={ingredient.calories}
            proteins={ingredient.proteins}
            fat={ingredient.fat}
            carbs={ingredient.carbohydrates} />)
    }

    return (
        <article className={styles.card}>
            <img className={styles.image} src={ingredient.image} alt="" onClick={onClick} />
            <div className={styles.price}>
                <p className="text text_type_digits-default mr-2">{ingredient.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <div className={styles.name}>
                <h3 className="text text_type_main-default" onClick={onClick}>{ingredient.name}</h3>
            </div>
            { ingredient.count && <Counter count={ingredient.count} size="default" />}
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