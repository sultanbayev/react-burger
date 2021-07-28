import React from "react";
import PropTypes from 'prop-types';
import styles from './burger-component.module.css';
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerComponent({ type, text, isLocked, price, thumbnail }) {
    
    return (
        <div className={styles.component}>
            <div className={styles.drag_icon}>
                { !isLocked && <DragIcon type="primary" />}
            </div>
            <ConstructorElement
                type={type}
                isLocked={isLocked}
                text={text}
                price={price}
                thumbnail={thumbnail}                    
            />
        </div>
    );
}

BurgerComponent.propTypes = {
    type: PropTypes.string,
    text: PropTypes.string.isRequired,
    isLocked: PropTypes.bool,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired
}

export default React.memo(BurgerComponent);