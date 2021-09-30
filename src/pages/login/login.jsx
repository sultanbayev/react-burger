import styles from './style.module.css';
import { useState, useRef, useCallback, useEffect } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../services/actions/user';
import { Redirect, useLocation, Link } from 'react-router-dom';
import FormWrapper from '../../components/form-wrapper/form-wrapper';

function LoginPage() {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const [passwordIcon, setPasswordIcon] = useState('ShowIcon');
    const passwordRef = useRef(null);
    const dispatch = useDispatch();
    const location = useLocation();

    const onLoginClick = useCallback(() => {
        const formData = {
            email: form.email,
            password: form.password,
        };
        if (formData.email && formData.password) {
            dispatch(loginUser(formData));
        }
        // eslint-disable-next-line
    }, [form])

    useEffect(() => {
        const onEnter = (e) => {
            if (e.keyCode === 13) onLoginClick();
        }
        document.addEventListener('keydown', onEnter);
        return () => document.removeEventListener('keydown', onEnter);
    }, [onLoginClick]);

    const { loginRequest, isAuthorised, loginErrorMessage } = useSelector(store => store.user);

    if (isAuthorised) {
        if (location.state) {
            return (<Redirect to={ location.state.from } />);
        }
        return (<Redirect to={{ pathname: '/' }} />);
    }

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

    if (loginRequest) {
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
                <h2 className="text text_type_main-medium">Вход</h2>
            </div>
            <div className={styles.form}>
                <div className={setStyle([styles.center, 'mt-6'])}><Input
                    type={'email'}
                    placeholder={'E-mail'}
                    value={form.email}
                    name={'email'}
                    onChange={onChange}
                    />
                </div>
                <div className={setStyle([styles.center, 'mt-6'])}><Input
                    type={'password'}
                    icon={passwordIcon}
                    onIconClick={onIconClick}
                    placeholder={'Пароль'}
                    value={form.password}
                    ref={passwordRef}
                    name={'password'}
                    onChange={onChange}
                    />
                </div>
                { loginErrorMessage && <div className={setStyle([styles.center, 'mt-6'])}>
                    <p className={setStyle([styles.center, styles.error, 'text text_type_main-default'])}>
                        { loginErrorMessage }
                    </p>
                </div> }
                <div className={setStyle([styles.center, 'mt-6', 'mb-20'])}>
                    <Button type="primary" size="medium" onClick={onLoginClick}>
                        Войти
                    </Button>
                </div>
            </div>
            <div className={styles.center}>
                <p className="text text_type_main-default">Вы — новый пользователь?&nbsp;
                    <Link to="/register" className={styles.link}>Зарегистрироваться</Link>
                </p>
            </div>
            <div className={styles.center}>
                <p className="text text_type_main-default">Забыли пароль?&nbsp;
                    <Link to="/forgot-password" className={styles.link}>Восстановить пароль</Link>
                </p>
            </div>
        </FormWrapper>
    )
}

export default LoginPage;