import NavItem from '../nav-item/nav-item';
import styles from './styles.module.css';
import { useSelector } from 'react-redux';

function NavBar() {

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
        <nav className={styles.nav}>
            <ul className={styles.list}>
                { links.map((link) => {
                        return (
                            <li key={link.id} className={styles.item}>
                                <NavItem path={link.path} text={link.text} icon={link.icon} />
                            </li>
                        );
                    })
                }
            </ul>
        </nav>
    );
}

export default NavBar;