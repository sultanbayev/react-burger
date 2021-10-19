import styles from './styles.module.css';
import { memo, useMemo, useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { getFormattedDate } from '../../../utils/date-format';
import ComponentAvatarGroup from '../avatar-group/avatar-group';
import PropTypes from 'prop-types';

function OrderCard({ number, createdAt, name, ingredients, status }) {

    const [updatedIngredients, setUpdatedIngredients] = useState([]);
    const { items } = useSelector(store => store.burgerIngredients)

    useEffect(() => {
        const updatedIngredients = ingredients
                .map(ingredientId => items.find(item => item._id === ingredientId))
                .filter(ingredient => ingredient)
                .reduce((ingredients, ingredient) => {
                    const existingIngredientId = ingredients.findIndex(i => i._id === ingredient._id);
                    if (existingIngredientId >= 0) {
                        ingredients[existingIngredientId].count++
                    } else {
                        ingredients.push({ ...ingredient, count: 1 })
                    }
                    return ingredients;
                }, []);
        setUpdatedIngredients(updatedIngredients);
    }, [items, ingredients])

    const totalPrice = useMemo(() => {
        return updatedIngredients.length ? updatedIngredients.reduce((total, ingredient) => {
            return total + ( ingredient.price * ingredient.count )
        }, 0) : 0;
    }, [updatedIngredients]);

    return (
        <div className={styles.card}>
            <div className={styles.topDetails}>
                <div><p className="text text_type_digits-default">#{number}</p></div>
                <div className={styles.date}>
                    <p className="text text_type_main-small">{getFormattedDate(createdAt)}</p>
                </div>
            </div>
            <div className={styles.heading}>
                <h3 className="text text_type_main-medium">{name}</h3>
            </div>
            { status && (
                <div className={styles.status}>
                    { (status === 'done')
                        ? <span className={styles.done}><p className="text text_type_main-default">Выполнен</p></span>
                        : (status === 'сreated')
                            ? <p className="text text_type_main-default">Создан</p>
                            : <p className="text text_type_main-default">Готовится</p>
                    }
                </div>
            ) }
            
            <div className={styles.bottomDetails}>
                { updatedIngredients.length && <ComponentAvatarGroup items={updatedIngredients} max={6} /> }
                <div className={styles.price}>
                    <p className="text text_type_digits-default mr-2">{totalPrice}</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    );
}

OrderCard.propTypes = {
    number: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    status: PropTypes.string
}

export default memo(OrderCard);