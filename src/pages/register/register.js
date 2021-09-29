import { useDispatch, useSelector } from 'react-redux';
import styles from './style.module.css';
import { useState, useRef, useCallback, useEffect } from 'react';
import { Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { registerUser } from '../../redux/actions/user';
import { Redirect } from 'react-router-dom';
import FormWrapper from '../../components/form-wrapper/form-wrapper';


function RegisterPage() {
    const [form, setForm] = useState({
        name: '',
        email: '',
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

    const onRegisterClick = useCallback(() => {
        const formData = { ...form };
        if (formData.email && formData.password && formData.name) {
            dispatch(registerUser(formData));
        }
    }, [dispatch, form]);

    useEffect(() => {
        const onEnter = (e) => {
            if (e.keyCode === 13) onRegisterClick();
        }
        document.addEventListener('keydown', onEnter);
        return () => document.removeEventListener('keydown', onEnter);
    }, [onRegisterClick]);

    const { registerRequest, isAuthorised, registerErrorMessage } = useSelector(store => store.user)

    if (isAuthorised) return (<Redirect to={{ pathname: '/' }} />);

    if (registerRequest) {
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
                <h2 className="text text_type_main-medium">Регистрация</h2>
            </div>
            <div className={styles.form}>
                <div className={setStyle([styles.center, 'mt-6'])}><Input
                    type={'text'}
                    placeholder={'Имя'}
                    value={form.name}
                    name={'name'}
                    onChange={onChange}
                    />
                </div>
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
                { registerErrorMessage && <div className={setStyle([styles.center, 'mt-6'])}>
                    <p className={setStyle([styles.center, styles.error, 'text text_type_main-default'])}>
                        { registerErrorMessage }
                    </p>
                </div> }
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
        </FormWrapper>
    )
}

export default RegisterPage;