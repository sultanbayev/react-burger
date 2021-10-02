import ProfileNav from '../../components/profile-nav/profile-nav';
import styles from './style.module.css';

function ProfileOrdersPage() {
    return (
        <div className={styles.wrapper}>
            <ProfileNav />
            <div><p className="text text_type_main-large">Заказы</p></div> 
        </div>
        
    );
}

export default ProfileOrdersPage;