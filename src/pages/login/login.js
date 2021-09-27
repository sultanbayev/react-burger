import styles from './style.module.css';
import { useState, useRef, useCallback } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/user';
import { Redirect, useLocation } from 'react-router-dom';

function LoginPage() {

    const [form, setForm] = useState({
        email: { value: '' },
        password: {
            value: '',
            icon: 'ShowIcon',
        }
    })

    const passwordRef = useRef(null);

    const onChange = e => {
        setForm({
            ...form,
            [e.target.name]: {
                ...form[e.target.name],
                value: e.target.value,
            }
        })
    }

    const onIconClick = () => {
        if (passwordRef.current.type === 'password') {
            passwordRef.current.type = 'text';
            setForm({
                ...form,
                password: {
                    ...form.password,
                    icon: 'HideIcon',
                }
            })
        } else {
            passwordRef.current.type = 'password'
            setForm({
                ...form,
                password: {
                    ...form.password,
                    icon: 'ShowIcon',
                }
            })
        }
    }

    const setStyle = (styles) => {
        return styles.join(' ');
    }

    const dispatch = useDispatch();

    const onLoginClick = useCallback((e) => {
        const formData = {
            email: form.email.value,
            password: form.password.value,
        } 
        if (formData.email && formData.password) {
            e.preventDefault();
            dispatch(login(formData));
        }
    }, [dispatch, form])

    const { user } = useSelector(store => store.user);
    const location = useLocation();

    if (user) {
        if (location.state) {
            return <Redirect to={ location.state.from } />
        }
        return (
            <Redirect to={{ pathname: '/' }} />
        );
    }
    
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={setStyle([styles.header, styles.center])}>
                    <h2 className="text text_type_main-medium">Вход</h2>
                </div>
                <div className={styles.form}>
                    <div className={setStyle([styles.center, 'mt-6'])}><Input
                        type={'email'}
                        placeholder={'E-mail'}
                        value={form.email.value}
                        name={'email'}
                        onChange={onChange}
                        />
                    </div>
                    <div className={setStyle([styles.center, 'mt-6'])}><Input
                        type={'password'}
                        icon={form.password.icon}
                        onIconClick={onIconClick}
                        placeholder={'Пароль'}
                        value={form.password.value}
                        ref={passwordRef}
                        name={'password'}
                        onChange={onChange}
                        />
                    </div>
                    <div className={setStyle([styles.center, 'mt-6', 'mb-20'])}>
                        <Button type="primary" size="medium" onClick={onLoginClick}>
                            Войти
                        </Button>
                    </div>
                </div>
                <div className={styles.center}>
                    <p className="text text_type_main-default">Вы — новый пользователь?&nbsp;
                        <a href="/register" className={styles.link}>Зарегистрироваться</a>
                    </p>
                </div>
                <div className={styles.center}>
                    <p className="text text_type_main-default">Забыли пароль?&nbsp;
                        <a href="/forgot-password" className={styles.link}>Восстановить пароль</a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;