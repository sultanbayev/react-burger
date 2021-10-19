import styles from './style.module.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import FeedOrderInfo from '../../components/feed-order-info/feed-order-info';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSE } from '../../services/actions/wsActions';

function FeedOrderPage() {

    const { id } = useParams();
    const dispatch = useDispatch();
    const { wsConnected, orders } = useSelector(store => store.orders);
    const [order, setOrder] = useState(null);

    useEffect(() => {
        if (!wsConnected) {
            dispatch({ type: WS_CONNECTION_START});
        }
        return () => {
            dispatch({ type: WS_CONNECTION_CLOSE});
        }
    //eslint-disable-next-line
    }, []);

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

export default FeedOrderPage;