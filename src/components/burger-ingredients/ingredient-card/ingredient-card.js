import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientShape } from '../../../services/utils/prop-types';
import { useDispatch } from 'react-redux';
import { openModalWithIngredient } from '../../../services/actions/modal';
import { useDrag } from 'react-dnd';
import { dndTypes } from '../../../services/utils/constants';

function IngredientCard({ ingredient }) {
    const dispatch = useDispatch();

    const [, drag] = useDrag({
        type: dndTypes.INGREDIENT,
        item: ingredient,
    });

    const onClickHandle = () => {
        dispatch(openModalWithIngredient(ingredient));
    }

    return (
        <article ref={drag} className={styles.card}>
            <img className={styles.image} src={ingredient.image} alt={ingredient.name} onClick={onClickHandle} />
            <div className={styles.price}>
                <p className="text text_type_digits-default mr-2">{ingredient.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <div className={styles.name} onClick={onClickHandle}>
                <h3 className="text text_type_main-default">{ingredient.name}</h3>
            </div>
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