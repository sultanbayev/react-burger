import styles from './style.module.css';
import { useState, useRef } from 'react';
import { Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { restorePassword } from '../../redux/actions/user';
import { Redirect } from 'react-router-dom';

function ResetPasswordPage() {
    const [form, setForm] = useState({
        code: {
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

    const onRestoreClick = () => {
        const formData = {
            password: form.password.value,
            token: form.code.value,
        }
        dispatch(restorePassword(formData));
    }

    const { restorePasswordSuccess, restorePasswordRequest } = useSelector(store => store.user);

    if (restorePasswordSuccess) {
        return <Redirect to={'/login'} />
    }

    if (restorePasswordRequest) {
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
                        type={'password'}
                        icon={form.password.icon}
                        onIconClick={onIconClick}
                        placeholder={'Введите новый пароль'}
                        value={form.password.value}
                        ref={passwordRef}
                        name={'password'}
                        onChange={onChange}
                        />
                    </div>
                    <div className={setStyle([styles.center, 'mt-6'])}><Input
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        value={form.code.value}
                        name={'code'}
                        onChange={onChange}
                        />
                    </div>
                    <div className={setStyle([styles.center, 'mt-6', 'mb-20'])}>
                        <Button type="primary" size="medium" onClick={onRestoreClick}>
                            Сохранить
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

export default ResetPasswordPage;

