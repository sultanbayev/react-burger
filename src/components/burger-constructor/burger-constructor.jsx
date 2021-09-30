import styles from './styles.module.css';
import ComponentList from './component-list/component-list';
import OrderInfo from './order-info/order-info';
import Modal from '../modal/modal';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_MODAL } from '../../services/actions/modal';

function BurgerConstructor() {

    const { isOpen, content } = useSelector(store => store.modal);
    const dispatch = useDispatch();

    const onModalClose = () => {
        dispatch({ type: CLOSE_MODAL });
    }

    return (
        <section className={styles.container}>
            <ComponentList />
            <OrderInfo />
            { isOpen && <Modal onClose={onModalClose}>{content}</Modal> }
        </section>
    );
}

export default BurgerConstructor;