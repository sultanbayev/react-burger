import styles from './style.module.css';
import { Link } from 'react-router-dom';

function NotFoundPage() {
    return (
        <div className={styles.wrapper}>
            <div>
                <p className="text text_type_main-large">404. Страница не найдена.</p>
                <p className="text text_type_main-default">
                    <Link to="/" className={styles.link}>Вернуться на главную</Link>
                </p>
            </div>
        </div>
    )
}

export default NotFoundPage;