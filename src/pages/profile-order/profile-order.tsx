import styles from './style.module.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/hooks';
import { useParams } from 'react-router-dom';
import FeedOrderInfo from '../../components/feed-order-info/feed-order-info';
import { userWsClose, userWsInit } from '../../services/actions/wsActions';
import { TOrder } from '../../services/types/data';

function ProfileOrderPage() {

    const { id } = useParams<any>();

    const dispatch = useDispatch();
    const { isAuthorised, wsConnected, orders } = useSelector(state => ({
        orders: state.userOrders.orders,
        wsConnected: state.userOrders.wsConnected,
        isAuthorised: state.user.isAuthorised,
    }));
    const [order, setOrder] = useState<TOrder | null>(null);

    useEffect(() => {
        if (isAuthorised && !wsConnected) {
          dispatch(userWsInit());
        }
        return () => {
            dispatch(userWsClose());
        }
        //eslint-disable-next-line
    }, [isAuthorised]);

    useEffect(() => {
        const order = orders.find(o => o._id === id);
        if (order) {
            setOrder(order);
        }
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