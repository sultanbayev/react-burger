import styles from './styles.module.css';
import NavBar from './nav-bar/nav-bar';
import AppLogo from './app-logo/app-logo';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {

    const links = [
        {   
            id: 0,
            to: '/',
            text: 'Конструктор',
            icon: <BurgerIcon />,
        },
        {   
            id: 1,
            to: '/',
            text: 'Лента заказов',
            icon: <ListIcon />,
        },
        {   
            id: 2,
            to: '/profile',
            text: 'Личный кабинет',
            icon: <ProfileIcon />,
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