import { useSelector } from '../../services/hooks';
import { Route, Redirect } from 'react-router-dom';
import React from 'react';

interface IProtectedRouteProps {
    path: string;
    children: React.ReactNode;
    exact?: boolean;
}

const ProtectedRoute: React.FC<IProtectedRouteProps> = ({ children, ...rest }) => {

    const { isAuthorised } = useSelector(store => store.user);

    return (
        <Route {...rest} render={({ location }) => (
            isAuthorised
                ? children
                : <Redirect to={{
                        pathname: '/login',
                        state: { from: location }
                    }} />
        )} />
    )
}

export default React.memo(ProtectedRoute);