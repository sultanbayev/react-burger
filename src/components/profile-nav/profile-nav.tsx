import styles from './style.module.css';
import { useMemo, FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from '../../services/hooks';
import { logoutUserThunk } from '../../services/actions/user';
import { useLocation } from 'react-router-dom';
import { TLink } from '../../services/types/data';

interface IProfileNavProps {
    links: TLink[];
}

const ProfileNav: FC<IProfileNavProps> = ({ links }) => {

    const location = useLocation();
    const dispatch = useDispatch();

    const setStyle = styles => styles.join(' ');

    const logout = () => {
        dispatch(logoutUserThunk());
    }

    const link = useMemo(() => {
        return links.find(link => link.to === location.pathname);
    }, [links, location]);

    return (
            <div>
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
            { link && (
                <div className={styles.description}>
                    <p className='text text_type_main-default text_color_inactive'>
                        { link.desc }
                    </p>
                </div>
            ) }
            </div>
    );
}

export default ProfileNav;