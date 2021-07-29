import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './tab-bar.module.css';

function TabBar() {
    const [current, setCurrent] = React.useState('buns');

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

export default React.memo(TabBar);