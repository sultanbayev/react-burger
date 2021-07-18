import React from "react";
import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import NavLink from './nav-link/NavLink';


function AppHeader() {
    return (
        <header className={styles.header}>
            <div className={styles.content}>
                <nav className={styles.nav}>
                    <ul className={styles.list}>
                        <li>
                            <NavLink text="Конструктор" isActive={true}>
                                <BurgerIcon type="primary" />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink text="Лента заказов" isActive={false}>
                                <ListIcon type="secondary" />
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <div className={styles.logo}>
                    <Logo />
                </div>
                <div>
                    <NavLink text="Личный кабинет" isActive={false}>
                        <ProfileIcon type="secondary" />
                    </NavLink>
                </div>
            </div>
        </header>
    );
    
}

export default AppHeader;