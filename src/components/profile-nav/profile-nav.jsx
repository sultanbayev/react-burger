import styles from './style.module.css';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../services/actions/user';

function ProfileNav() {

    const dispatch = useDispatch();

    const links = [
        {   
            id: 0,
            to: '/profile',
            text: 'Профиль',
        },
        {   
            id: 1,
            to: '/profile/orders',
            text: 'История заказов',
        },
    ];

    const setStyle = styles => styles.join(' ');

    const logout = () => {
        dispatch(logoutUser());
    }

    return (
        <aside className={styles.aside}>
            <div className={styles.menu}>
                { links.map(link => {
                        return (
                            <div key={link.id} className={styles.menu_item}>
                                <NavLink
                                    to={link.to}
                                    activeClassName={styles.active}
                                    exact
                                >
                                    <p className="text text_type_main-medium">
                                        {link.text}</p>
                                </NavLink>
                            </div>
                        );
                    })
                }
                <div className={styles.menu_item}>
                    <button
                        className={setStyle(['text text_type_main-medium text_color_inactive', 
                            styles.btn_logout])}
                        onClick={logout}>Выход</button>
                </div>
            </div>
            <div className={styles.description}>
                <p className='text text_type_main-default text_color_inactive'>
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            </div>
        </aside>
    );
}

export default ProfileNav;