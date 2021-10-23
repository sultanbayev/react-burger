import React, { useRef, FC } from "react";
import styles from './styles.module.css';
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from '../../../services/hooks';
import { removeConstructorComponentThunk } from "../../../services/actions/burger-constructor";
import { useDrag, useDrop, XYCoord  } from "react-dnd";
import { dndTypes } from "../../../utils/constants";
import { TIngredientWithUuid } from '../../../services/types/data';

interface IBurgerComponentProps {
    type?: 'top' | 'bottom';
    component: TIngredientWithUuid;
    isLocked?: boolean;
    index?: number;
    moveComponent?: (dragIndex: number, hoverIndex: number) => void;
}

const BurgerComponent: FC<IBurgerComponentProps> = ({ type, isLocked, component, index, moveComponent }) => {

    const ref = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();

    const removeItem = () => {
        dispatch(removeConstructorComponentThunk(component));
    }
    
    const [{ handlerId }, drop] = useDrop({
        accept: dndTypes.CONSTRUCTOR_ITEM,
        collect: (monitor) => {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item: { id: string; index: number }, monitor): void {
            if (!ref.current) {
                return;
            }
            
            const dragIndex = item.index;
            let hoverIndex: number;

            if (index !== undefined) {
                hoverIndex = index;
            } else {
                return;
            }

            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset: XYCoord | null = monitor.getClientOffset();
            const hoverClientY = clientOffset ? (clientOffset.y - hoverBoundingRect.top) : null;
            if (hoverClientY) {
                if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                    return;
                }
                if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                    return;
                }
            }
            moveComponent && moveComponent(dragIndex, hoverIndex);
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

export default React.memo(BurgerComponent);