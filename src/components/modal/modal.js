import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './modal-overlay/modal-overlay';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById("modal-root");

function Modal({ children, onModalClose }) {

    useEffect(() => {
        const onClose = (e) => {
            if (e.keyCode === 27) onModalClose();
        }
        document.addEventListener('keydown', onClose);
        return () => document.removeEventListener('keydown', onClose);
    }, [onModalClose])

    return ReactDOM.createPortal(
        (
            <div className={styles.container}>
                <div className={styles.modal}>
                    <div className={styles.close}>
                        <CloseIcon type="primary" onClick={onModalClose} />
                    </div>
                    { children }
                </div>
                <ModalOverlay onModalClose={onModalClose} />
            </div>
        ), modalRoot
    );
}

Modal.propTypes = {
    children: PropTypes.element.isRequired,
    onModalClose: PropTypes.func.isRequired,
}

export default React.memo(Modal);