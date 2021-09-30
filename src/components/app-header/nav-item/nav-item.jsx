import React from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch } from 'react-router-dom';
import { ProfileIcon, BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';

function NavItem({ path, text, icon, activeClass, passiveClass }) {

    const match = useRouteMatch(path);
    const isActive = match && match.isExact;

    const className = isActive
        ? activeClass
        : passiveClass;

    const getIcon = (iconName) => {
        const type = isActive ? 'primary' : 'secondary';
        switch(iconName) {
            case 'burger': {
                return <BurgerIcon type={type} />
            }
            case 'list': {
                return <ListIcon type={type} />
            }
            case 'profile':
            default: {
                return <ProfileIcon type={type} />
            } 
        }
    }

    return (
        <NavLink to={path}>
            {icon && getIcon(icon)}
            <p className={className}>{text}</p>
        </NavLink>
    );
}

NavItem.propTypes = {
    path: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    icon: PropTypes.string,
    activeClass: PropTypes.string,
    passiveClass: PropTypes.string,
};

export default React.memo(NavItem);