import React from 'react';
import PropTypes from 'prop-types';
import styles from './ingredient-card.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

function IngredientCard({ name, image, price, count, onModalOpen }) {

    const onClick = () => {
        onModalOpen(<div></div>)
    }

    return (
        <article className={styles.card}>
            <img className={styles.image} src={image} alt="" onClick={onClick} />
            <div className={styles.price}>
                <p className="text text_type_digits-default mr-2">{price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <div className={styles.name}>
                <h3 className="text text_type_main-default" onClick={onClick}>{name}</h3>
            </div>
            { count && <Counter count={count} size="default" />}
        </article>
    );
}

IngredientCard.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    count: PropTypes.number,
    onModalOpen: PropTypes.func.isRequired
}

export default React.memo(IngredientCard);