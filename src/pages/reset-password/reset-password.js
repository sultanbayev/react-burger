import styles from './style.module.css';
import { useState, useRef } from 'react';
import { Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';

function ResetPasswordPage() {
    const [state, setState] = useState({
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
        setState({
            ...state,
            [e.target.name]: {
                ...state[e.target.name],
                value: e.target.value,
            }
        })
    }

    const onIconClick = () => {
        if (passwordRef.current.type === 'password') {
            passwordRef.current.type = 'text';
            setState({
                ...state,
                password: {
                    ...state.password,
                    icon: 'HideIcon',
                }
            })
        } else {
            passwordRef.current.type = 'password'
            setState({
                ...state,
                password: {
                    ...state.password,
                    icon: 'ShowIcon',
                }
            })
        }
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
                        type={'password'}
                        icon={state.password.icon}
                        onIconClick={onIconClick}
                        placeholder={'Введите новый пароль'}
                        value={state.password.value}
                        ref={passwordRef}
                        name={'password'}
                        onChange={onChange}
                        />
                    </div>
                    <div className={setStyle([styles.center, 'mt-6'])}><Input
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        value={state.code.value}
                        name={'code'}
                        onChange={onChange}
                        />
                    </div>
                    <div className={setStyle([styles.center, 'mt-6', 'mb-20'])}>
                        <Button type="primary" size="medium">
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

