import React from "react";
import styles from './app-logo.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';

function AppLogo() {
    return (
        <a href="/" className={styles.logo}>
            <Logo />
        </a>
    );
}

export default AppLogo;