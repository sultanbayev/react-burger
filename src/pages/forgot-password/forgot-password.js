import styles from './style.module.css';
import { useState } from 'react';
import { Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';

function ForgotPasswordPage() {
    const [email, setEmail] = useState('');

    const onChange = e => {
        setEmail(e.target.value)
    }

    const setStyle = (styles) => {
        return styles.join(' ');
    }
    
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={setStyle([styles.header, styles.center])}>
                    <h2 className="text text_type_main-medium">Восстановление пароля</h2>
                </div>
                <div className={styles.form}>
                    <div className={setStyle([styles.center, 'mt-6'])}><Input
                        type={'email'}
                        placeholder={'Укажите e-mail'}
                        value={email}
                        name={'email'}
                        onChange={onChange}
                        />
                    </div>
                    <div className={setStyle([styles.center, 'mt-6', 'mb-20'])}>
                        <Button type="primary" size="medium">
                            Восстановить
                        </Button>
                    </div>
                </div>
                <div className={styles.center}>
                    <p className="text text_type_main-default">Вспомнили пароль?&nbsp;
                        <a href="/login" className={styles.link}>Войти</a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ForgotPasswordPage;