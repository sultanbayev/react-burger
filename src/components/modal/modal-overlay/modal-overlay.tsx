import React from 'react';
import styles from './styles.module.css';

interface IModalOverlayProps {
    onClose: () => void;
}

const ModalOverlay: React.FC<IModalOverlayProps> = ({onClose}) => {
    return (
        <div className={styles.overlay} onClick={onClose}></div>
    );
}

export default React.memo(ModalOverlay);