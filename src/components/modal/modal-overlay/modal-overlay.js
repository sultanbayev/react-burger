import React from 'react';
import styles from './styles.module.css';
import PropTypes from 'prop-types';

function ModalOverlay({onModalClose}) {
    return (
        <div className={styles.overlay} onClick={onModalClose}></div>
    );
}

ModalOverlay.propTypes = {
    onModalClose: PropTypes.func.isRequired,
}

export default React.memo(ModalOverlay);