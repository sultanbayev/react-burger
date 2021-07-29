import React from "react";
import PropTypes from 'prop-types';
import styles from './component-list.module.css';
import BurgerComponent from '../burger-component/burger-component';
import ingredientShape from '../../../utils/prop-types';

function ComponentList({ components }) {
    return (
        <ul className={[styles.list, styles.outerList].join(' ')}>
            <li className={styles.bun}>
                <BurgerComponent
                    type="top"
                    isLocked={true}
                    text={components.bun.name}
                    price={components.bun.price}
                    thumbnail={components.bun.image_mobile}                    
                />
            </li>
            <li className={styles.ingredients_container}>
                <ul className={styles.list}>
                {
                    components.ingredients.map((component, key) => 
                        <li key={key} className={styles.staffing}>
                            <BurgerComponent
                                text={component.name}
                                price={component.price}
                                thumbnail={component.image_mobile}                    
                            />
                        </li> 
                    )
                }
                </ul>
            </li>
            <li className={styles.bun}>
                <BurgerComponent
                    type="bottom"
                    isLocked={true}
                    text={components.bun.name}
                    price={components.bun.price}
                    thumbnail={components.bun.image_mobile}                    
                />
            </li>
        </ul>
    );
}

ComponentList.propTypes = {
    components: PropTypes.shape({
        bun: PropTypes.shape(ingredientShape).isRequired,
        ingredients: PropTypes.arrayOf(PropTypes.shape(ingredientShape)).isRequired
    }).isRequired
}

export default React.memo(ComponentList);