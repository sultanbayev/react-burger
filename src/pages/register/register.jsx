import { useDispatch, useSelector } from 'react-redux';
import styles from './style.module.css';
import { useState, useRef } from 'react';
import { Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { registerUser } from '../../services/actions/user';
import { Redirect, Link } from 'react-router-dom';
import FormWrapper from '../../components/form-wrapper/form-wrapper';

function RegisterPage() {
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [passwordIcon, setPasswordIcon] = useState('ShowIcon');
    const passwordRef = useRef(null);
    
    const { registerRequest, isAuthorised, registerErrorMessage } = useSelector(store => store.user)

    if (isAuthorised) return (<Redirect to={{ pathname: '/' }} />);

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = { ...form };
        if (formData.email && formData.password && formData.name) {
            dispatch(registerUser(formData));
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

    if (registerRequest) {
        return (
            <FormWrapper>
                <p className="text text_type_main-medium">Ждите...</p>
            </FormWrapper>
        );
    }
    
    return (
        <FormWrapper>
            <h2 className="text text_type_main-medium">Регистрация</h2>
            <form onSubmit={onSubmit} className={styles.form}>
                <div className="mt-6"><Input
                    type={'text'}
                    placeholder={'Имя'}
                    value={form.name}
                    name={'name'}
                    onChange={onChange}
                    />
                </div>
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
                { registerErrorMessage && (
                    <div className={`mt-6 ${styles.error}`}>
                        <p className="text text_type_main-default">{ registerErrorMessage }</p>
                    </div> )
                }
                <div className="mt-6">
                    <Button type="primary" size="medium">Зарегистрироваться</Button>
                </div>
            </form>
            <div>
                <p className="text text_type_main-default">Уже зарегистрированы?&nbsp;
                    <Link to="/login" className={styles.link}>Войти</Link>
                </p>
            </div>
        </FormWrapper>
    )
}

export default RegisterPage;