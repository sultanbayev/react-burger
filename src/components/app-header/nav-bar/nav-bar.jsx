import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.css';
import PropTypes from 'prop-types';

function NavBar({ links }) {

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

NavBar.propTypes = {
    links: PropTypes.arrayOf(PropTypes.shape({   
        id: PropTypes.number.isRequired,
        to: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        icon: PropTypes.node,
    }).isRequired).isRequired,
};

export default React.memo(NavBar);