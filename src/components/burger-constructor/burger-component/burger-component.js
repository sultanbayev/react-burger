import React, { useContext } from "react";
import PropTypes from 'prop-types';
import styles from './burger-component.module.css';
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerConstructorContext } from "../../../contexts";
import { componentShape } from '../../../utils/prop-types'

function BurgerComponent({ type, isLocked, component }) {

    const { onStaffingRemove } = useContext(BurgerConstructorContext);
    
    return (
        <div className={styles.component}>
            { !isLocked &&
                <div className={styles.drag_icon}>
                    <DragIcon type="primary" />
                </div>
            }
            <ConstructorElement
                type={type}
                isLocked={isLocked}
                text={component.name}
                price={component.price}
                thumbnail={component.image} 
                handleClose={() => onStaffingRemove(component)}                   
            />
        </div>
    );
}

BurgerComponent.propTypes = {
    type: PropTypes.string,
    isLocked: PropTypes.bool,
    component: PropTypes.shape(componentShape),
}

export default React.memo(BurgerComponent);