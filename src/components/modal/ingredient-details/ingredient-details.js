import React from 'react';
import styles from './ingredient-details.module.css';
import PropTypes from 'prop-types';

function IngredientDetails({name, image, calories, fat, carbs, proteins}) {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3 className='text text_type_main-large'>Детали ингредиента</h3>
            </div>
            <div className={styles.details}>
                <img src={image} alt={name} />
                <p className='text text_type_main-medium mt-4 mb-8'>{name}</p>
                <div className={styles.info}>
                    <div className={styles.info_item}>
                        <p className='text text_type_main-default text_color_inactive mb-2'>Калории,ккал</p>
                        <p className='text text_type_digits-default text_color_inactive'>{calories}</p>
                    </div>
                    <div className={styles.info_item}>
                        <p className='text text_type_main-default text_color_inactive mb-2'>Белки, г</p>
                        <p className='text text_type_digits-default text_color_inactive'>{proteins}</p>
                    </div>
                    <div className={styles.info_item}>
                        <p className='text text_type_main-default text_color_inactive mb-2'>Жиры, г</p>
                        <p className='text text_type_digits-default text_color_inactive'>{fat}</p>
                    </div>
                    <div className={styles.info_item}>
                        <p className='text text_type_main-default text_color_inactive mb-2'>Углеводы, г</p>
                        <p className='text text_type_digits-default text_color_inactive'>{carbs}</p>
                    </div>
                </div>
            </div>
        </div>
        
    );
}

IngredientDetails.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
}

export default React.memo(IngredientDetails);