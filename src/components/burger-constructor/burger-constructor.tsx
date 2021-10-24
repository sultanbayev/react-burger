import styles from './styles.module.css';
import ComponentList from './component-list/component-list';
import OrderInfo from './order-info/order-info';
import Modal from '../modal/modal';
import OrderDetails from '../modal/order-details/order-details';
import { useState, useCallback, useEffect } from 'react';
import { useSelector } from '../../services/hooks';

function BurgerConstructor() {

    const [open, setOpen] = useState(false)

    const onClose = useCallback(() => {
        setOpen(false);
    }, []);

    const { number } = useSelector(state => state.order);

    useEffect(() => {
        if ( number ) {
            setOpen(true);
        }
    }, [number])

    return (
        <>
            <section className={styles.container}>
                <ComponentList />
                <OrderInfo />
            </section>
            { (open && number) && <Modal onClose={onClose}><OrderDetails orderNumber={number} /></Modal> }
        </>
    );
}

export default BurgerConstructor;