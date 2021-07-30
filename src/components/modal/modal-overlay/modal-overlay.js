import React from 'react';
import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

function ModalOverlay({children, onModalClose}) {

    return (
        <div className={styles.container}>
            {children}
            <div className={styles.overlay} onClick={onModalClose}></div>
        </div>
    );
}

ModalOverlay.propTypes = {
    children: PropTypes.element.isRequired,
    onModalClose: PropTypes.func.isRequired
}

export default React.memo(ModalOverlay);