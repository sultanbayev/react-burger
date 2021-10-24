import React, { useEffect, FC } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css';

interface ITabBar {
    active: string;
}

const TabBar: FC<ITabBar> = ({ active }) => {
    const [current, setCurrent] = React.useState('buns');

    useEffect(() => {
        setCurrent(active)
    }, [active])

    const setTab = (tabValue: string) => {
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