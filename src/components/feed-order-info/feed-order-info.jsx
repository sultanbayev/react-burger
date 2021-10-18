import styles from './styles.module.css';
import { memo, useMemo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { getFormattedDate } from '../../utils/date-format';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ComponentAvatar from '../orders-list/avatar/avatar';

function FeedOrderInfo({ order }) {

    const [ingredients, setIngredients] = useState([]);
    const { items } = useSelector(store => store.burgerIngredients)

    useEffect(() => {
        const ingredients = order.ingredients
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
        setIngredients(ingredients);
    }, [items, order])

    const totalPrice = useMemo(() => {
        return ingredients.length ? ingredients.reduce((total, ingredient) => {
            return total + (ingredient.price * ingredient.count)
        }, 0) : 0;
    }, [ingredients]);

    return (
        <div className={styles.container}>
            <div className={styles.number}>
                <p className="text text_type_digits-default">{`#${order.number}`}</p>
            </div>
            <div className="mt-10">
                <h1 className="text text_type_main-medium">{order.name}</h1>
            </div>
            <div className="mt-3">
                { (order.status === 'done')
                    ? <span className={styles.done}><p className="text text_type_main-default">Выполнен</p></span>
                    : (order.status === 'сreated')
                        ? <p className="text text_type_main-default">Создан</p>
                        : <p className="text text_type_main-default">Готовится</p>
                }
            </div>
            <div className="mt-15">
                <h2 className="text text_type_main-medium">Состав:</h2>
                <div className={styles.ingredients}>
                    { ingredients.length && ingredients.map((ingredient, index) => {
                            return (
                                <div className={styles.item} key={index}>
                                    <ComponentAvatar image={ingredient.image} alt={ingredient.name} />
                                    <div className={styles.name}>
                                        <p className="text text_type_main-default ml-4">{ingredient.name}</p>
                                    </div>
                                    <div className={styles.price}>
                                        <p className="text text_type_digits-default mr-2">
                                            {`${ingredient.count} x ${ingredient.price}`}
                                        </p>
                                        <CurrencyIcon type="primary" />
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
            <div className={`${styles.footer} mt-10`}>
                <p className="text text_type_main-default text_color_inactive">{getFormattedDate(order.createdAt)}</p>
                <div className={styles.price}>
                    <p className="text text_type_digits-default mr-2">{totalPrice}</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
            
        </div>
    );
}

FeedOrderInfo.propTypes = {
    order: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        number: PropTypes.number.isRequired,
        createdAt: PropTypes.string.isRequired,
        updatedAt: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        ingredients: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    }).isRequired
}

export default memo(FeedOrderInfo);