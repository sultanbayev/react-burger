import styles from './style.module.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import FeedOrderInfo from '../../components/feed-order-info/feed-order-info';
import { USER_WS_CONNECTION_CLOSE, USER_WS_CONNECTION_START } from '../../services/actions/wsActions';

function ProfileOrderPage() {

    const { id } = useParams();

    const dispatch = useDispatch();
    const { isAuthorised, wsConnected, orders } = useSelector(store => ({
        orders: store.userOrders.orders,
        wsConnected: store.userOrders.wsConnected,
        isAuthorised: store.user.isAuthorised,
    }));
    const [order, setOrder] = useState(null);

    useEffect(() => {
        if (isAuthorised && !wsConnected) {
          dispatch({ type: USER_WS_CONNECTION_START});
        }
        return () => {
            dispatch({ type: USER_WS_CONNECTION_CLOSE});
        }
        //eslint-disable-next-line
    }, [isAuthorised]);

    useEffect(() => {
        const order = orders.find(o => o._id === id);
        setOrder(order);
    //eslint-disable-next-line
    }, [orders]);

    if (orders && !orders.length) {
        return (
            <div className={styles.wrapper}>
                <div><p className="text text_type_main-medium">
                    Загрузка...</p></div>
            </div>
        );
    }

    if (order) {
        return (
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <FeedOrderInfo order={order} />
                </div>
            </div>
        );
    } else {
        return (
            <div className={styles.wrapper}>
                <div><p className="text text_type_main-medium">
                    Ой, не нашли такой заказ!</p></div>
            </div>
        );
    }
}

export default ProfileOrderPage;