import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

function PrivateRoute({ children, ...rest }) {

    const { isAuthorised } = useSelector(store => store.user);

    return (
        <Route {...rest} render={({ location }) => (
            isAuthorised ? ( children )
                : ( <Redirect to={{ pathname: '/login', state: { from: location } }} /> )
        )} />
    )
}

export default PrivateRoute;

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
    rest: PropTypes.object
}