import styles from './style.module.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import IngredientDetails from '../../components/modal/ingredient-details/ingredient-details';

function IngredientPage() {

    const { id } = useParams();
    const { items, itemsRequest, itemsSuccess } = useSelector(store => store.burgerIngredients);
    const [ingredient, setIngredient] = useState(null);

    useEffect(() => {
        const ingredient = items.find(i => i._id === id);
        setIngredient(ingredient);
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