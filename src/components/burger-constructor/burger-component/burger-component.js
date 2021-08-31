import React, { useRef } from "react";
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { componentShape } from '../../../utils/prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { removeConstructorComponent, REORDER_CONSTRUCTOR_COMPONENTS } from "../../../redux/actions/burger-constructor";
import { useDrag, useDrop } from "react-dnd";
import { dndTypes } from "../../../utils/constants";

function BurgerComponent({ type, isLocked, item }) {
    const dispatch = useDispatch();
    const staffings = useSelector(store => store.burgerConstructor.staffings)

    const handleClose = () => {
        dispatch(removeConstructorComponent(item))
    }

    const ref = useRef(null)

    const [{isDragging}, drag] = useDrag({
        type: dndTypes.CONSTRUCTOR_ITEM,
        item: item,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const [{isHovered}, drop] = useDrop({
        accept: dndTypes.CONSTRUCTOR_ITEM,
        collect: (monitor) => ({
            isHovered: monitor.isOver(),
        }),
        drop(dragItem) {
            if (dragItem.uuid === item.uuid) return;
            const dropItem = item;
            let filtered = staffings.filter(i => i.uuid !== dragItem.uuid);
            const dropIndex = filtered.findIndex(i => i.uuid === dropItem.uuid);
            filtered.splice(dropIndex, 0, dragItem);
            dispatch({
                type: REORDER_CONSTRUCTOR_COMPONENTS,
                reordered: filtered,
            })
        }
    })

    drag(drop(ref));
    const style = [styles.component, isHovered && styles.hovered, isDragging && styles.dragged];

    return (
        item.type === 'bun' ? (
            <div className={styles.component}>
                <ConstructorElement
                    type={type}
                    isLocked={isLocked}
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}                 
                />
            </div>
        ) : (
            <div ref={ref} className={style.join(' ')}>
                { !isLocked &&
                    <div className={styles.drag_icon}>
                        <DragIcon type="primary" />
                    </div>
                }
                <ConstructorElement
                    type={type}
                    isLocked={isLocked}
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image} 
                    handleClose={handleClose}                   
                />
            </div>
        )
    );
}

BurgerComponent.propTypes = {
    type: PropTypes.string,
    isLocked: PropTypes.bool,
    item: PropTypes.shape(componentShape),
}

export default React.memo(BurgerComponent);