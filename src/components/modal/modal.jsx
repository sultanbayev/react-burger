import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './modal-overlay/modal-overlay';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById("modal-root");

function Modal({ children, onClose }) {

    useEffect(() => {
        const onEscPressed = (e) => {
            if (e.keyCode === 27) onClose();
        }
        document.addEventListener('keydown', onEscPressed);
        return () => document.removeEventListener('keydown', onEscPressed);
    }, [onClose])

    return ReactDOM.createPortal(
        (
            <div className={styles.container}>
                <div className={styles.modal}>
                    <div className={styles.close}>
                        <CloseIcon type="primary" onClick={onClose} />
                    </div>
                    { children }
                </div>
                <ModalOverlay onClose={onClose} />
            </div>
        ), modalRoot
    );
}

Modal.propTypes = {
    children: PropTypes.element.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default React.memo(Modal);