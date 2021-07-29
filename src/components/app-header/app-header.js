import React from "react";
import styles from './app-header.module.css';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import NavLink from './nav-link/nav-link';
import NavBar from './nav-bar/nav-bar';
import AppLogo from './app-logo/app-logo';

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