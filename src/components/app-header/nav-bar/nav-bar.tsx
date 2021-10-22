import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.css';
import { ILink } from '../app-header';

type TNavBarProps = {
    links: Array<ILink>;
};

const NavBar: FC<TNavBarProps> = ({ links }) => {

    return (
        <nav className={styles.nav}>
            <ul className={styles.list}>
                { links.map((link) => {
                        return (
                            <li key={link.id} className={styles.item}>
                                <NavLink
                                    to={link.to}
                                    activeClassName={styles.active}
                                    className={styles.inactive}
                                    exact={link.to === '/' ? true : false}
                                >
                                    {link.icon}
                                    <p className="text text_type_main-default ml-2">{link.text}</p>
                                </NavLink>
                            </li>
                        );
                    })
                }
            </ul>
        </nav>
    );
}

export default React.memo(NavBar);