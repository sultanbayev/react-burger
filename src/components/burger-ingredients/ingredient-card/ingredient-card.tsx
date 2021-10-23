import React, {FC} from 'react';
import styles from './styles.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { dndTypes } from '../../../utils/constants';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { TIngredientWithCount } from '../../../services/types/data';

interface IIngredientCardProps {
    ingredient: TIngredientWithCount;
}

const IngredientCard: FC<IIngredientCardProps> = ({ ingredient }) => {

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

export default React.memo(IngredientCard);