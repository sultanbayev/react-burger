import styles from './style.module.css';
import { useEffect, useState } from 'react';
import { useSelector } from '../../services/hooks';
import { useParams } from 'react-router-dom';
import IngredientDetails from '../../components/modal/ingredient-details/ingredient-details';
import { TIngredientWithCount } from '../../services/types/data';

function IngredientPage() {

    const { id } = useParams<any>();
    const { items, itemsRequest, itemsSuccess } = useSelector(state => state.burgerIngredients);
    const [ingredient, setIngredient] = useState<TIngredientWithCount | null>(null);

    useEffect(() => {
        const ingredient = items.find(i => i._id === id);
        if (ingredient) {
            setIngredient(ingredient);
        }
    //eslint-disable-next-line
    }, [itemsSuccess])

    if (itemsRequest) {
        return (
            <div className={styles.wrapper}>
                <div><p className="text text_type_main-medium">
                    Загрузка...</p></div>
            </div>
        );
    }

    if (!ingredient) {
        return (
            <div className={styles.wrapper}>
                <div><p className="text text_type_main-medium">
                    Ой, не нашли такой ингредиент!</p></div>
            </div>
        );
    }

    return (
        <div className={styles.wrapper}>
            <IngredientDetails ingredient={ingredient} />
        </div>
    );
}

export default IngredientPage;