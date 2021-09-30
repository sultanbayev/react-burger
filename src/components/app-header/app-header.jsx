import styles from './styles.module.css';
import NavBar from './nav-bar/nav-bar';
import AppLogo from './app-logo/app-logo';
import { useSelector } from 'react-redux';

function AppHeader() {

    const { isAuthorised } = useSelector(store => store.user);

    const links = [
        {   
            id: 0,
            path: '/',
            text: 'Конструктор',
            icon: 'burger',
        },
        {   
            id: 1,
            path: '/',
            text: 'Лента заказов',
            icon: 'list',
        },
        {   
            id: 2,
            path: isAuthorised ? '/profile' : '/login',
            text: isAuthorised ? 'Личный кабинет' : 'Войти',
            icon: 'profile',
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