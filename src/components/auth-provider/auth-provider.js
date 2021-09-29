import { getUserData } from '../../redux/actions/user';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

function AuthProvider({ children }) {

    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem('refreshToken');
        token && dispatch(getUserData())
        //eslint-disable-next-line
    }, []);

    return (
        <>
            {children}
        </>
    );
}

AuthProvider.propTypes = {
    children: PropTypes.element,
}

export default AuthProvider;