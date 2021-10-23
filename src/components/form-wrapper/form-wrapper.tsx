import styles from './style.module.css';
import React from 'react';

interface IFormWrapperProps {
    children: React.ReactNode;
}

const FormWrapper: React.FC<IFormWrapperProps> = ({ children }) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                { children }
            </div>
        </div>
    );
}

export default React.memo(FormWrapper);