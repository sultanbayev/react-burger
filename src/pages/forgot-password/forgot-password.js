import styles from './style.module.css';
import { useState, useEffect, useCallback } from 'react';
import { Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { forgotUserPassword } from '../../redux/actions/user';
import { Redirect } from 'react-router-dom';
import FormWrapper from '../../components/form-wrapper/form-wrapper';

function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const { forgotPasswordSuccess, forgotPasswordRequest } = useSelector(store => store.user);
    const onChange = e => setEmail(e.target.value);

    const setStyle = styles => styles.join(' ');
    const dispatch = useDispatch()

    const onForgortPasswordClick = useCallback(() => {
        const formData = { email: email };
        if (formData.email) {
            dispatch(forgotUserPassword(formData));
        }
        // eslint-disable-next-line
    }, [email]);

    useEffect(() => {
        const onEnter = (e) => {
            if (e.keyCode === 13) onForgortPasswordClick();
        }
        document.addEventListener('keydown', onEnter);
        return () => document.removeEventListener('keydown', onEnter);
    }, [onForgortPasswordClick]);

    if (forgotPasswordSuccess) return (<Redirect to={'/reset-password'} />);
    
    if (forgotPasswordRequest) {
        return (
            <FormWrapper>
                <div className={styles.center}>
                    <p className="text text_type_main-medium">Ждите...</p>
                </div>
            </FormWrapper>
        );
    }

    return (
        <FormWrapper>
            <div className={styles.center}>
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
        </FormWrapper>
    )
}

export default ForgotPasswordPage;