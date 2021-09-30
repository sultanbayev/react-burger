import { useState, useEffect, useRef } from 'react';
import styles from './style.module.css';
import NavItem from '../../components/app-header/nav-item/nav-item';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData, logoutUser, patchUserData } from '../../services/actions/user';

function ProfilePage() {

    const dispatch = useDispatch();
    const { user, getUserRequest, patchUserErrorMessage } = useSelector(store => store.user);

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    })

    useEffect(() => {
        dispatch(getUserData());
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (user.name && user.email) {
            setForm({
                ...form,
                name: user.name,
                email: user.email,
                password: '',
            });
        }
        //eslint-disable-next-line
    }, [user]);

    const onSaveClick = () => {
        let formData = {};
        if (form.email) {
            formData = {
                ...formData,
                email: form.email,
            }
        }
        if (form.name) {
            formData = {
                ...formData,
                name: form.name,
            }
        }
        if (form.password) {
            formData = {
                ...formData,
                password: form.password,
            }
        }
        dispatch(patchUserData(formData));
    }

    const onCancelClick = () => {
        setForm({
            ...form,
            name: user.name,
            email: user.email,
            password: '',
        });
    }

    const links = [
        {   
            id: 0,
            path: '/profile',
            text: 'Профиль',
        },
        {   
            id: 1,
            path: '/profile/orders',
            text: 'История заказов',
        }
    ];

    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const activeClass = 'text text_type_main-medium';
    const passiveClass = 'text text_type_main-medium text_color_inactive';

    const setStyle = styles => styles.join(' ');

    const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const onNameEditClick = () => {
        nameRef.current.disabled = false;
        nameRef.current.classList.remove('input__textfield-disabled');
        nameRef.current.focus();
    }
    
    const onEmailEditClick = () => {
        emailRef.current.disabled = false;
        emailRef.current.classList.remove('input__textfield-disabled');
        emailRef.current.focus();
    }

    const onPasswordEditClick = () => {
        passwordRef.current.disabled = false;
        passwordRef.current.classList.remove('input__textfield-disabled');
        passwordRef.current.focus();
    }

    const onInputBlur = (ref) => {
        ref.current.disabled = true;
        ref.current.classList.add('input__textfield-disabled');
    }
    
    const logout = (e) => {
        e.preventDefault();
        dispatch(logoutUser());
    }

    return (
        <div className={styles.wrapper}>
            <aside className={styles.aside}>
                <div className={styles.menu}>
                    { links.map(link => {
                            return (
                                <div key={link.id} className={styles.menu_item}>
                                    <NavItem
                                        path={link.path}
                                        text={link.text}
                                        activeClass={activeClass}
                                        passiveClass={passiveClass}
                                    />
                                </div>
                            );
                        })
                    }
                    <div className={styles.menu_item}>
                        <button
                            className={setStyle(['text text_type_main-medium text_color_inactive', 
                                styles.btn_logout])}
                            onClick={logout}>Выход</button>
                    </div>
                </div>
                <div className={styles.description}>
                    <p className='text text_type_main-default text_color_inactive'>
                        В этом разделе вы можете изменить свои персональные данные
                    </p>
                </div>
            </aside>

            <main>
                { getUserRequest ? <div><p className="text text_type_main-small">Загружается...</p></div> 
                : 
                <div className={styles.form}>
                    <div className={styles.center}><Input
                        type={'text'}
                        name={'name'}
                        value={form.name}
                        placeholder={'Имя'}
                        icon={'EditIcon'}
                        disabled
                        onIconClick={onNameEditClick}
                        onChange={onChange}
                        ref={nameRef}
                        onBlur={() => onInputBlur(nameRef)}
                    /></div>
                    <div className={setStyle([styles.center, 'mt-6'])}><Input
                        type={'email'}
                        name={'email'}
                        value={form.email}
                        placeholder={'Логин'}
                        icon={'EditIcon'}
                        disabled
                        onIconClick={onEmailEditClick}
                        onChange={onChange}
                        ref={emailRef}
                        onBlur={() => onInputBlur(emailRef)}
                    /></div>
                    <div className={setStyle([styles.center, 'mt-6'])}><Input
                        type={'password'}
                        name={'password'}
                        value={form.password}
                        placeholder={'Пароль'}
                        icon={'EditIcon'}
                        disabled
                        onIconClick={onPasswordEditClick}
                        onChange={onChange}
                        ref={passwordRef}
                        onBlur={() => onInputBlur(passwordRef)}
                    /></div>
                    { patchUserErrorMessage && <div className={setStyle([styles.center, 'mt-6'])}>
                    <p className={setStyle([styles.center, styles.error, 'text text_type_main-default'])}>
                        { patchUserErrorMessage }
                    </p>
                    </div> }
                    <div className={setStyle([styles.center, 'mt-6'])}>
                        <Button type="primary" size="medium" onClick={onSaveClick}>
                            Сохранить
                        </Button>
                        <Button type="secondary" size="medium" onClick={onCancelClick}>
                            Отмена
                        </Button>
                    </div>
                </div>
                }
                
            </main>
        </div>
    )
}

export default ProfilePage;