import styles from './styles.module.css';
import NavBar from './nav-bar/nav-bar';
import AppLogo from './app-logo/app-logo';

function AppHeader() {
    return (
        <header className={styles.header}>
            <div className={styles.content}>
                <NavBar />
                <AppLogo />
            </div>
        </header>
    );
    
}

export default AppHeader;