import { useSelector } from 'react-redux';
import styles from './styles.module.css';

function IngredientDetails() {

    const ingredient = useSelector(store => store.ingredientDetails.ingredient);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3 className='text text_type_main-large'>Детали ингредиента</h3>
            </div>
            <div className={styles.details}>
                <img src={ingredient.image} alt={ingredient.name} />
                <p className='text text_type_main-medium mt-4 mb-8'>{ingredient.name}</p>
                <div className={styles.info}>
                    <div className={styles.info_item}>
                        <p className='text text_type_main-default text_color_inactive mb-2'>Калории,ккал</p>
                        <p className='text text_type_digits-default text_color_inactive'>{ingredient.calories}</p>
                    </div>
                    <div className={styles.info_item}>
                        <p className='text text_type_main-default text_color_inactive mb-2'>Белки, г</p>
                        <p className='text text_type_digits-default text_color_inactive'>{ingredient.proteins}</p>
                    </div>
                    <div className={styles.info_item}>
                        <p className='text text_type_main-default text_color_inactive mb-2'>Жиры, г</p>
                        <p className='text text_type_digits-default text_color_inactive'>{ingredient.fat}</p>
                    </div>
                    <div className={styles.info_item}>
                        <p className='text text_type_main-default text_color_inactive mb-2'>Углеводы, г</p>
                        <p className='text text_type_digits-default text_color_inactive'>{ingredient.carbohydrates}</p>
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default IngredientDetails;