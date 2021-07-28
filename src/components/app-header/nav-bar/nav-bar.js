import React from 'react';
import NavLink from '../nav-link/nav-link';
import { BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './nav-bar.module.css';

function NavBar() {
    return (
        <nav className={styles.nav}>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <NavLink text="Конструктор" isActive={true}>
                        <BurgerIcon type="primary" />
                    </NavLink>
                </li>
                <li className={styles.item}>
                    <NavLink text="Лента заказов" isActive={false}>
                        <ListIcon type="secondary" />
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;