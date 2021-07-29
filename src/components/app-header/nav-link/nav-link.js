import React from 'react';
import styles from './nav-link.module.css';
import PropTypes from 'prop-types';

function NavLink({ text, children, isActive }) {
    return (
        <a href="#" className={styles.navlink}>
            {children}
            <p className={'text text_type_main-default ml-2 ' + (!isActive && 'text_color_inactive')}>{text}</p>
        </a>
    );
}

NavLink.propTypes = {
    text: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired
};

export default React.memo(NavLink);