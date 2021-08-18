import { useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './modal-overlay/modal-overlay';
import { useSelector, useDispatch } from 'react-redux';
import { contentTypes } from '../../services/utils/constants';
import IngredientDetails from './ingredient-details/ingredient-details';
import OrderDetails from './order-details/order-details';
import { closeModalWithIngredient } from '../../services/actions/modal';

const modalRoot = document.getElementById("modal-root");

function Modal() {

    const dispatch = useDispatch();
    const modal = useSelector(store => store.modal);

    const onModalClose = useCallback(() => {
        dispatch(closeModalWithIngredient());
    }, [dispatch])

    useEffect(() => {
        const onClose = (e) => {
            if (e.keyCode === 27) onModalClose();
        }
        document.addEventListener('keydown', onClose);
        return () => document.removeEventListener('keydown', onClose);
    }, [onModalClose])

    if (modal.isOpen) {
        return ReactDOM.createPortal(
            (
                <div className={styles.container}>
                    <div className={styles.modal}>
                        <div className={styles.close}>
                            <CloseIcon type="primary" onClick={onModalClose} />
                        </div>
                        { modal.content === contentTypes.INGREDIENT_DETAILS
                            ? <IngredientDetails />
                            : <OrderDetails />}
                    </div>
                    <ModalOverlay onModalClose={onModalClose} />
                </div>
            ), modalRoot
        );
    } else {
        return null;
    }
}

export default Modal;