import styles from './style.module.css';
import ProfileNav from '../../components/profile-nav/profile-nav';
import { TLink } from '../../services/types/data';
import React from 'react';

const links: TLink[] = [
    {   
        id: 0,
        to: '/profile',
        text: 'Профиль',
        desc: 'В этом разделе вы можете изменить свои персональные данные',
    },
    {   
        id: 1,
        to: '/profile/orders',
        text: 'История заказов',
        desc: 'В этом разделе вы можете просмотреть свою историю заказов',
    },
];

const ProfilePage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    
    return (
        <div className={styles.wrapper}>
            <aside className={styles.aside}><ProfileNav links={links} /></aside>
            <section className={styles.content}>
                { children }
            </section>
        </div>
    )
}

export default ProfilePage;