import React, { useEffect, FC } from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './modal-overlay/modal-overlay';

const modalRoot = document.getElementById("modal-root");

interface IModalProps {
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: FC<IModalProps> = ({ children, onClose }) => {

    useEffect(() => {
        const onEscPressed = (e: KeyboardEvent) => {
            if (e.code === "Escape") onClose();
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
        ), modalRoot as HTMLElement
    );
}

export default React.memo(Modal);