import styles from './styles.module.css';
import NavBar from './nav-bar/nav-bar';
import AppLogo from './app-logo/app-logo';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export type TLink = {
    id: number;
    to: string;
    text: string;
    icon: React.ReactNode;
}

function AppHeader() {

    const links: TLink[] = [
        {   
            id: 0,
            to: '/',
            text: 'Конструктор',
            icon: <BurgerIcon type="primary" />,
        },
        {   
            id: 1,
            to: '/feed',
            text: 'Лента заказов',
            icon: <ListIcon type="primary" />,
        },
        {   
            id: 2,
            to: '/profile',
            text: 'Личный кабинет',
            icon: <ProfileIcon type="primary" />,
        },
    ];

    return (
        <header className={styles.header}>
            <div className={styles.content}>
                <NavBar links={links} />
                <AppLogo />
            </div>
        </header>
    );
    
}

export default AppHeader;