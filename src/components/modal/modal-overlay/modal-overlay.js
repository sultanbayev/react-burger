import React, { useContext } from 'react';
import styles from './modal-overlay.module.css';
import { ModalContext } from '../../../contexts';

function ModalOverlay() {
    const {onModalClose} = useContext(ModalContext);
    return (
        <div className={styles.overlay} onClick={onModalClose}></div>
    );
}

export default React.memo(ModalOverlay);