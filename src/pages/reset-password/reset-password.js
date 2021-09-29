import styles from './style.module.css';
import { useState, useRef, useCallback, useEffect } from 'react';
import { Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { resetUserPassword } from '../../redux/actions/user';
import { Redirect } from 'react-router-dom';
import FormWrapper from '../../components/form-wrapper/form-wrapper';

function ResetPasswordPage() {
    const [form, setForm] = useState({
        token: '',
        password: '',
    });
    const [passwordIcon, setPasswordIcon] = useState('ShowIcon');
    const passwordRef = useRef(null);
    const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const onIconClick = () => {
        if (passwordRef.current.type === 'password') {
            passwordRef.current.type = 'text';
            setPasswordIcon('HideIcon');
        } else {
            passwordRef.current.type = 'password';
            setPasswordIcon('ShowIcon');
        }
    }

    const setStyle = styles => styles.join(' ');
    const dispatch = useDispatch();

    const onResetPasswordClick = useCallback(() => {
        const formData = { ...form };
        if (formData.password && formData.token) {
            dispatch(resetUserPassword(formData));
        }
        // eslint-disable-next-line
    }, [form]);

    useEffect(() => {
        const onEnter = (e) => {
            if (e.keyCode === 13) onResetPasswordClick();
        }
        document.addEventListener('keydown', onEnter);
        return () => document.removeEventListener('keydown', onEnter);
    }, [onResetPasswordClick]);

    const { resetPasswordSuccess, resetPasswordRequest, resetPasswordErrorMessage, isAuthorised } = useSelector(store => store.user);

    const isResetPassword = localStorage.getItem('isResetPassword');
    if (!isResetPassword) return (<Redirect to={'/forgot-password'} />);
    if (isAuthorised) return (<Redirect to={'/'} />);
    if (resetPasswordSuccess) return (<Redirect to={'/login'} />);

    if (resetPasswordRequest) {
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
                    type={'password'}
                    icon={passwordIcon}
                    onIconClick={onIconClick}
                    placeholder={'Введите новый пароль'}
                    value={form.password}
                    ref={passwordRef}
                    name={'password'}
                    onChange={onChange}
                    />
                </div>
                <div className={setStyle([styles.center, 'mt-6'])}><Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    value={form.token}
                    name={'token'}
                    onChange={onChange}
                    />
                </div>
                { resetPasswordErrorMessage && <div className={setStyle([styles.center, 'mt-6'])}>
                    <p className={setStyle([styles.center, styles.error, 'text text_type_main-default'])}>
                        { resetPasswordErrorMessage }
                    </p>
                </div> }
                <div className={setStyle([styles.center, 'mt-6', 'mb-20'])}>
                    <Button type="primary" size="medium" onClick={onResetPasswordClick}>
                        Сохранить
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

export default ResetPasswordPage;

