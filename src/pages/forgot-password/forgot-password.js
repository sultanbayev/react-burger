import styles from './style.module.css';
import { useState } from 'react';
import { Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../redux/actions/user';
import { Redirect } from 'react-router-dom';

function ForgotPasswordPage() {
    const [email, setEmail] = useState('');

    const { resetPasswordSuccess, resetPasswordRequest } = useSelector(store => store.user);

    const onChange = e => {
        setEmail(e.target.value)
    }

    const setStyle = (styles) => {
        return styles.join(' ');
    }

    const dispatch = useDispatch()

    const onForgortPasswordClick = () => {
        dispatch(resetPassword({ email: email }));
    }

    if (resetPasswordSuccess) {
        return <Redirect to={'/reset-password'} />
    }
    
    if (resetPasswordRequest) {
        return (
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <div className={setStyle([styles.header, styles.center])}>
                        <p className="text text_type_main-medium">Ждите...</p>
                    </div>
                </div>
            </div>
        );
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
                        <Button type="primary" size="medium" onClick={onForgortPasswordClick}>
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