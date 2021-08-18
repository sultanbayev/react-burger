import React, { useEffect } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css';
import PropTypes from 'prop-types';

function TabBar({ active }) {
    const [current, setCurrent] = React.useState('buns');

    useEffect(() => {
        setCurrent(active)
    }, [active])

    const setTab = (tabValue) => {
        setCurrent(tabValue);
        const element = document.getElementById(tabValue);
        if (element) element.scrollIntoView({ behavior: "smooth" });
    };

    return ( 
        <div className={styles.tab_bar}>
            <Tab value="buns" active={current === 'buns'} onClick={setTab}>Булки</Tab>
            <Tab value="sauces" active={current === 'sauces'} onClick={setTab}>Соусы</Tab>
            <Tab value="mains" active={current === 'mains'} onClick={setTab}>Начинки</Tab>
        </div>
    );
}

TabBar.propTypes = {
    active: PropTypes.string.isRequired,
}

export default React.memo(TabBar);