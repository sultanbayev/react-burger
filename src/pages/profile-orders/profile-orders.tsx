import styles from './style.module.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/hooks';
import OrderList from '../../components/orders-list/order-list';
import { userWsClose, userWsInit } from '../../services/actions/wsActions';

function ProfileOrdersPage() {

    const dispatch = useDispatch();
    const { isAuthorised, wsConnected, orders } = useSelector(state => ({
        orders: state.userOrders.orders,
        wsConnected: state.userOrders.wsConnected,
        isAuthorised: state.user.isAuthorised,
    }));

    useEffect(() => {
        if (isAuthorised && !wsConnected) {
          dispatch(userWsInit());
        }

        return () => {
            dispatch(userWsClose());
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