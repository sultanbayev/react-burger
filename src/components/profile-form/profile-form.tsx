import React, { useState, useEffect, useRef } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from '../../services/hooks';
import { getUserDataThunk, patchUserDataThunk } from '../../services/actions/user';
import styles from './style.module.css';

function ProfileForm() {

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    });
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const dispatch = useDispatch();
    
    const { user, getUserRequest, patchUserErrorMessage } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getUserDataThunk());
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        if ('name' in user && 'email' in user) {
            setForm({
                ...form,
                name: user.name,
                email: user.email,
                password: '',
            });
        }
        //eslint-disable-next-line
    }, [user]);

    const onSubmit = (e) => {
        e.preventDefault();
        let formData = {};
        if (form.email) { formData = {...formData, email: form.email} }
        if (form.name) { formData = {...formData, name: form.name} }
        if (form.password) { formData = {...formData, password: form.password} }
        dispatch(patchUserDataThunk(formData));
    }

    const onCancelClick = (e) => {
        e.preventDefault();
        if ('name' in user && 'email' in user) {
            setForm({
                ...form,
                name: user.name,
                email: user.email,
                password: '',
            });
        }
    }

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const onInputEditClick = (ref) => {
        ref.current.disabled = false;
        ref.current.classList.remove('input__textfield-disabled');
        ref.current.focus();
    }

    const onInputBlur = (ref) => {
        ref.current.disabled = true;
        ref.current.classList.add('input__textfield-disabled');
    }

    return (
        <div>
                { getUserRequest
                    ? <div><p className="text text_type_main-default">Загружается...</p></div> 
                    : <form onSubmit={onSubmit} className={styles.form}>
                        <div>
                            <Input
                                type={'text'}
                                name={'name'}
                                value={form.name}
                                placeholder={'Имя'}
                                icon={'EditIcon'}
                                disabled
                                onIconClick={() => onInputEditClick(nameRef)}
                                onChange={onChange}
                                ref={nameRef}
                                onBlur={() => onInputBlur(nameRef)}
                            />
                        </div>
                        <div className="mt-6">
                            <Input
                                type={'email'}
                                name={'email'}
                                value={form.email}
                                placeholder={'Логин'}
                                icon={'EditIcon'}
                                disabled
                                onIconClick={() => onInputEditClick(emailRef)}
                                onChange={onChange}
                                ref={emailRef}
                                onBlur={() => onInputBlur(emailRef)}
                            />
                        </div>
                        <div className="mt-6">
                            <Input
                                type={'password'}
                                name={'password'}
                                value={form.password}
                                placeholder={'Пароль'}
                                icon={'EditIcon'}
                                disabled
                                onIconClick={() => onInputEditClick(passwordRef)}
                                onChange={onChange}
                                ref={passwordRef}
                                onBlur={() => onInputBlur(passwordRef)}
                            />
                        </div>
                        { patchUserErrorMessage && (
                            <div className={`mt-6 ${styles.error}`}>
                                <p className="text text_type_main-default">{ patchUserErrorMessage }</p>
                            </div> )
                        }
                        <div className="mt-6">
                            <Button type="primary" size="medium">Сохранить</Button>
                            <Button type="secondary" size="medium" onClick={onCancelClick}>Отмена</Button>
                        </div>
                    </form>
                }
            </div>
    )
}


export default ProfileForm;