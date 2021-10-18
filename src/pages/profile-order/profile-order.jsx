import styles from './style.module.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import FeedOrderInfo from '../../components/feed-order-info/feed-order-info';

function ProfileOrderPage() {

    const { id } = useParams();

    const { orders } = useSelector(store => store.userOrders);
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const order = orders.find(o => o._id === id);
        setOrder(order);
    //eslint-disable-next-line
    }, [orders]);

    if (!orders.length) {
        return (
            <div className={styles.wrapper}>
                <div><p className="text text_type_main-medium">
                    Загрузка...</p></div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className={styles.wrapper}>
                <div><p className="text text_type_main-medium">
                    Ой, не нашли такой заказ!</p></div>
            </div>
        );
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <FeedOrderInfo order={order} />
            </div>
        </div>
    );
}

export default ProfileOrderPage;