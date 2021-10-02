import styles from './styles.module.css';
import React from 'react';
import PropTypes from 'prop-types';
import { ingredientShape } from '../../../utils/prop-types';

function IngredientDetails({ ingredient }) {

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3 className='text text_type_main-large'>Детали ингредиента</h3>
            </div>
            <div className={styles.details}>
                <img src={ingredient.image_large} alt={ingredient.name} />
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

IngredientDetails.propTypes = {
    ingredient: PropTypes.shape({
            ...ingredientShape,
            count: PropTypes.number,
        }).isRequired,
}

export default React.memo(IngredientDetails);