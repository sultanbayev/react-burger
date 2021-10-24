import styles from './style.module.css';
import React from 'react';

interface IMainProps {
    children: React.ReactNode;
}

const Main: React.FC<IMainProps> = ({ children }) => {
    return (
        <main className={styles.main}>
            { children }
        </main>
    );
}

export default React.memo(Main);