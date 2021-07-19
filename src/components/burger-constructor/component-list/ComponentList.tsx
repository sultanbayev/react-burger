import React from "react";
import PropTypes from 'prop-types';
import styles from './component-list.module.css';
import BurgerComponent from '../burger-component/BurgerComponent';

function ComponentList({ components }) {
    return (
        <ul className={styles.list}>
            <li className={styles.bun}>
                <BurgerComponent
                    type="top"
                    isLocked={true}
                    text={components.bun.name}
                    price={components.bun.price}
                    thumbnail={components.bun.image_mobile}                    
                />
            </li>
            <li className={styles.staffing_container}>
                {
                    components.staffing.map(component => 
                        <li key={component._id} className={styles.staffing}>
                            <BurgerComponent
                                text={component.name}
                                price={component.price}
                                thumbnail={component.image_mobile}                    
                            />
                        </li> 
                    )
                }
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
    components: PropTypes.arrayOf(PropTypes.shape({
        bun: PropTypes.object.isRequired,
        staffing: PropTypes.arrayOf(PropTypes.object).isRequired
    })).isRequired
}

export default ComponentList;