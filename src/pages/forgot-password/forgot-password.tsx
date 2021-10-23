import styles from './style.module.css';
import { useState } from 'react';
import { Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from '../../services/hooks';
import { forgotUserPasswordThunk } from '../../services/actions/user';
import { Redirect, Link } from 'react-router-dom';
import FormWrapper from '../../components/form-wrapper/form-wrapper';

function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const onChange = e => setEmail(e.target.value);
    const dispatch = useDispatch()

    const { forgotPasswordSuccess, forgotPasswordRequest, isAuthorised } = useSelector(state => state.user);

    if (isAuthorised) return (<Redirect to={{ pathname: '/' }} />);

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = { email: email };
        if (formData.email) {
            dispatch(forgotUserPasswordThunk(formData));
        }
    }

    if (forgotPasswordSuccess) return (<Redirect to={'/reset-password'} />);
    
    if (forgotPasswordRequest) {
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
                        type={'email'}
                        placeholder={'Укажите e-mail'}
                        value={email}
                        name={'email'}
                        onChange={onChange}
                    />
                </div>
                <div className="mt-6">
                    <Button type="primary" size="medium">Восстановить</Button>
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

export default ForgotPasswordPage;