import styles from './styles.module.css';
import { memo, useMemo, useEffect, useState, FC } from "react";
import { useSelector } from '../../../services/hooks';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { getFormattedDate } from '../../../utils/date-format';
import ComponentAvatarGroup from '../avatar-group/avatar-group';
import { TIngredientWithCount } from '../../../services/types/data';

interface IOrderCard {
    number: number;
    createdAt: string;
    name:string;
    ingredients: string[];
    status?: string;
}

const OrderCard: FC<IOrderCard> = ({ number, createdAt, name, ingredients, status }) => {

    const [updatedIngredients, setUpdatedIngredients] = useState<TIngredientWithCount[]>([]);
    const { items } = useSelector(state => state.burgerIngredients)

    useEffect(() => {

        const ids: string[] = ingredients;
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
        setUpdatedIngredients(ingreds);
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

export default memo(OrderCard);