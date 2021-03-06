import styles from './styles.module.css';
import { memo, useMemo, useState, useEffect, FC } from 'react';
import { useSelector } from '../../services/hooks';
import { getFormattedDate } from '../../utils/date-format';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ComponentAvatar from '../orders-list/avatar/avatar';
import { TIngredientWithCount, TOrder } from '../../services/types/data';

interface IFeedOrderInfoProps {
    order: TOrder;
}

const FeedOrderInfo: FC<IFeedOrderInfoProps> = ({ order }) => {

    const [ingredients, setIngredients] = useState<TIngredientWithCount[]>([]);
    const { items } = useSelector(state => state.burgerIngredients)

    useEffect(() => {
        const ids: string[] = order.ingredients;
        const ingreds: TIngredientWithCount[] = [];
        ids.forEach(id => {
            const found: TIngredientWithCount | undefined = items.find(item => item._id === id);
            if (found) {
                const index = ingreds.findIndex(item => item._id === found._id);
                if (index === -1) {
                    ingreds.push({ ...found, count: 1 });
                } else {
                    ingreds[index].count++
                }
            }
        });
        setIngredients(ingreds);
    }, [items, order])

    const totalPrice = useMemo(() => {
        if (ingredients.length) {
            return ingredients
                .reduce((total, ingredient) => total + (ingredient.price * ingredient.count), 0)
        }
        return 0;
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
                    ? <span className={styles.done}><p className="text text_type_main-default">????????????????</p></span>
                    : (order.status === '??reated')
                        ? <p className="text text_type_main-default">????????????</p>
                        : <p className="text text_type_main-default">??????????????????</p>
                }
            </div>
            <div className="mt-15">
                <h2 className="text text_type_main-medium">????????????:</h2>
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

export default memo(FeedOrderInfo);