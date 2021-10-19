import styles from './style.module.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import OrderList from '../../components/orders-list/order-list';
import { USER_WS_CONNECTION_CLOSE, USER_WS_CONNECTION_START } from '../../services/actions/wsActions';

function ProfileOrdersPage() {

    const dispatch = useDispatch();
    const { isAuthorised, wsConnected, orders } = useSelector(store => ({
        orders: store.userOrders.orders,
        wsConnected: store.userOrders.wsConnected,
        isAuthorised: store.user.isAuthorised,
    }));

    useEffect(() => {
        if (isAuthorised && !wsConnected) {
          dispatch({ type: USER_WS_CONNECTION_START});
        }

        return () => {
            dispatch({ type: USER_WS_CONNECTION_CLOSE});
        }
        //eslint-disable-next-line
    }, [isAuthorised]);

    return (
        <section className={styles.orders}>
            { (orders && orders.length)
                ? <OrderList page={'profile/orders'} orders={[ ...orders].reverse()} withStatus />
                : <div><p className="text text_type_main-medium">Загрузка...</p></div>
            }
        </section>
    );
}

export default ProfileOrdersPage;