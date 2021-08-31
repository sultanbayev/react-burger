import styles from './style.module.css';

function NotFoundPage() {
    return (
        <div className={styles.wrapper}>
            <div>
                <p className="text text_type_main-large">
                    404. Страница не найдена.
                </p>
            </div>
        </div>
    )
}

export default NotFoundPage;