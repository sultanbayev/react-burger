import React from 'react';
import NavItem from '../nav-item/nav-item';
import styles from './styles.module.css';
import PropTypes from 'prop-types';

function NavBar({ links }) {

    const activeClass = 'text text_type_main-default ml-2';
    const passiveClass = 'text text_type_main-default ml-2 text_color_inactive';

    return (
        <nav className={styles.nav}>
            <ul className={styles.list}>
                { links.map((link) => {
                        return (
                            <li key={link.id} className={styles.item}>
                                <NavItem
                                    path={link.path}
                                    text={link.text}
                                    icon={link.icon}
                                    activeClass={activeClass}
                                    passiveClass={passiveClass}
                                />
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
        path: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        icon: PropTypes.string,
    }).isRequired).isRequired,
};

export default React.memo(NavBar);