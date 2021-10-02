import React, { useRef } from "react";
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { componentShape } from '../../../utils/prop-types';
import { useDispatch } from 'react-redux';
import { removeConstructorComponent } from "../../../services/actions/burger-constructor";
import { useDrag, useDrop } from "react-dnd";
import { dndTypes } from "../../../utils/constants";

function BurgerComponent({ type, isLocked, component, index, moveComponent }) {
    const ref = useRef(null);
    const dispatch = useDispatch();

    const removeItem = () => {
        dispatch(removeConstructorComponent(component));
    }

    const [{ handlerId }, drop] = useDrop({
        accept: dndTypes.CONSTRUCTOR_ITEM,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveComponent(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    });

    const [{ isDragging }, drag] = useDrag({
        type: dndTypes.CONSTRUCTOR_ITEM,
        item: () => {
            return { id: component.uuid, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref));

    return (
        component.type === 'bun' ? (
            <div className={styles.component}>
                <ConstructorElement
                    type={type}
                    isLocked={isLocked}
                    text={component.name}
                    price={component.price}
                    thumbnail={component.image}                 
                />
            </div>
        ) : (
            <div ref={ref} style={{ opacity: isDragging ? 0 : 1 }} className={styles.component} data-handler-id={handlerId}>
                { !isLocked && <div className={styles.drag_icon}><DragIcon type="primary" /></div> }
                <ConstructorElement
                    type={type}
                    isLocked={isLocked}
                    text={component.name}
                    price={component.price}
                    thumbnail={component.image} 
                    handleClose={removeItem}                   
                />
            </div>
        )
    );
}

BurgerComponent.propTypes = {
    type: PropTypes.string,
    isLocked: PropTypes.bool,
    component: PropTypes.shape(componentShape),
}

export default React.memo(BurgerComponent);