import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ children, ...rest }) {

    const { user } = useSelector(store => store.user);

    return (
        <Route {...rest} render={props => (
            (user)
                ? children
                : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )} />
    )
}

export default PrivateRoute;