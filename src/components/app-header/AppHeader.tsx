import React from "react";
import styles from './app-header.module.css';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import NavLink from './nav-link/NavLink';
import NavBar from './nav-bar/NavBar';
import AppLogo from './app-logo/AppLogo';

function AppHeader() {
    return (
        <header className={styles.header}>
            <div className={styles.content}>
                <NavBar />
                <AppLogo />
                <NavLink text="Личный кабинет" isActive={false}>
                    <ProfileIcon type="secondary" />
                </NavLink>
            </div>
        </header>
    );
    
}

export default AppHeader;