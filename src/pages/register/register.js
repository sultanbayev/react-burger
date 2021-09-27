import { useDispatch, useSelector } from 'react-redux';
import styles from './style.module.css';
import { useState, useRef, useCallback } from 'react';
import { Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { register } from '../../redux/actions/user';
import { Redirect } from 'react-router-dom';

function RegisterPage() {

    const [form, setForm] = useState({
        name: {
            value: '',
        },
        email: {
            value: '',
        },
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

    const onRegisterClick = useCallback((e) => {
        const formData = {
            email: form.email.value,
            name: form.name.value,
            password: form.password.value,
        } 
        if (formData.email && formData.password && formData.name) {
            e.preventDefault();
            dispatch(register(formData));
        }
    }, [dispatch, form])

    const { user } = useSelector(store => store.user)

    if (user) {
        return (
            <Redirect
                to={{ pathname: '/' }}
            />
        );
    }
    
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={setStyle([styles.header, styles.center])}>
                    <h2 className="text text_type_main-medium">Регистрация</h2>
                </div>
                <div className={styles.form}>
                    <div className={setStyle([styles.center, 'mt-6'])}><Input
                        type={'text'}
                        placeholder={'Имя'}
                        value={form.name.value}
                        name={'name'}
                        onChange={onChange}
                        />
                    </div>
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
                        <Button type="primary" size="medium" onClick={onRegisterClick}>
                            Зарегистрироваться
                        </Button>
                    </div>
                </div>
                <div className={styles.center}>
                    <p className="text text_type_main-default">Уже зарегистрированы?&nbsp;
                        <a href="/login" className={styles.link}>Войти</a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage;