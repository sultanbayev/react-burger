import styles from './style.module.css';
import React, { useState, useRef } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from '../../services/hooks';
import { loginUserThunks } from '../../services/actions/user';
import { Redirect, useLocation, Link } from 'react-router-dom';
import FormWrapper from '../../components/form-wrapper/form-wrapper';
import { Location } from 'history';

function LoginPage() {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const [passwordIcon, setPasswordIcon] = useState<any>('ShowIcon');
    const passwordRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();
    const location = useLocation<{ from?: Location }>();

    const { loginRequest, isAuthorised, loginErrorMessage } = useSelector(state => state.user);

    if (isAuthorised) {
        if (location.state?.from) {
            return (<Redirect to={ location.state.from } />);
        }
        return (<Redirect to={{ pathname: '/' }} />);
    }

    const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = { ...form };
        if (formData.email && formData.password) {
            dispatch(loginUserThunks(formData));
        }
    }

    const onIconClick = () => {
        if (passwordRef.current) {
            if (passwordRef.current.type === 'password') {
                passwordRef.current.type = 'text';
                setPasswordIcon('HideIcon');
            } else {
                passwordRef.current.type = 'password';
                setPasswordIcon('ShowIcon');
            }
        }
    }

    if (loginRequest) {
        return (
            <FormWrapper>
                <div><p className="text text_type_main-medium">Ждите...</p></div>
            </FormWrapper>
        );
    }

    return (
        <FormWrapper>
            <h2 className="text text_type_main-medium">Вход</h2>
            <form onSubmit={onSubmit} className={styles.form}>
                <div className="mt-6">
                    <Input
                        type={'email'}
                        placeholder={'E-mail'}
                        value={form.email}
                        name={'email'}
                        onChange={onChange}
                    />
                </div>
                <div className="mt-6">
                    <Input
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
                { loginErrorMessage && (
                    <div className={`mt-6 ${styles.error}`}>
                        <p className="text text_type_main-default">{ loginErrorMessage }</p>
                    </div> )
                }
                <div className="mt-6"><Button type="primary" size="medium">Войти</Button></div>
            </form>
            <div>
                <p className="text text_type_main-default">Вы — новый пользователь?&nbsp;
                    <Link to="/register" className={styles.link}>Зарегистрироваться</Link>
                </p>
            </div>
            <div>
                <p className="text text_type_main-default">Забыли пароль?&nbsp;
                    <Link to="/forgot-password" className={styles.link}>Восстановить пароль</Link>
                </p>
            </div>
        </FormWrapper>
    )
}

export default LoginPage;