import styles from './style.module.css';
import { useState, useRef } from 'react';
import { Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { resetUserPassword } from '../../services/actions/user';
import { Redirect, Link } from 'react-router-dom';
import FormWrapper from '../../components/form-wrapper/form-wrapper';

function ResetPasswordPage() {
    const [form, setForm] = useState({
        token: '',
        password: '',
    });
    const [passwordIcon, setPasswordIcon] = useState('ShowIcon');
    const passwordRef = useRef(null);
    const dispatch = useDispatch();

    const {
        resetPasswordSuccess,
        resetPasswordRequest,
        resetPasswordErrorMessage,
        isAuthorised
    } = useSelector(store => store.user);

    if (isAuthorised) return (<Redirect to={'/'} />);

    const isResetPassword = localStorage.getItem('isResetPassword');
    if (!isResetPassword) return (<Redirect to={'/forgot-password'} />);

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = { ...form };
        if (formData.password && formData.token) {
            dispatch(resetUserPassword(formData));
        }
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

    if (resetPasswordSuccess) return (<Redirect to={'/login'} />);

    if (resetPasswordRequest) {
        return (
            <FormWrapper>
                <p className="text text_type_main-medium">Ждите...</p>
            </FormWrapper>
        );
    }
    
    return (
        <FormWrapper>
            <h2 className="text text_type_main-medium">Восстановление пароля</h2>
            <form onSubmit={onSubmit} className={styles.form}>
                <div className="mt-6">
                    <Input
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
                <div className="mt-6">
                    <Input
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        value={form.token}
                        name={'token'}
                        onChange={onChange}
                    />
                </div>
                { resetPasswordErrorMessage && (
                    <div className={`mt-6 ${styles.error}`}>
                        <p className="text text_type_main-default">{ resetPasswordErrorMessage }</p>
                    </div> )
                }
                <div className="mt-6">
                    <Button type="primary" size="medium">Сохранить</Button>
                </div>
            </form>
            <div>
                <p className="text text_type_main-default">Вспомнили пароль?&nbsp;
                    <Link to="/login" className={styles.link}>Войти</Link>
                </p>
            </div>
        </FormWrapper>
    )
}

export default ResetPasswordPage;

