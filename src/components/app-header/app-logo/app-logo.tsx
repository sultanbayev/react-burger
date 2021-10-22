import styles from './styles.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

function AppLogo() {
    return (
        <Link to="/" className={styles.logo}>
            <Logo />
        </Link>
    );
}

export default AppLogo;