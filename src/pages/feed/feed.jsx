import styles from './style.module.css';
import { useMemo, useEffect } from 'react';
import OrderList from '../../components/orders-list/order-list';
import OrderStats from '../../components/orders-stats/order-stats';
import { useSelector, useDispatch } from 'react-redux';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSE } from '../../services/actions/wsActions';

function FeedPage() {
    
    const dispatch = useDispatch();
    const { wsConnected, orders, total, totalToday } = useSelector(store => store.orders);

    useEffect(() => {
        if (!wsConnected) {
            dispatch({ type: WS_CONNECTION_START});
        }
        return () => {
            dispatch({ type: WS_CONNECTION_CLOSE});
        }
    //eslint-disable-next-line
    }, []);

    const ordersDone = useMemo(() => {
        return orders.filter(order => order.status === 'done').map(order => order.number)
    }, [orders]);
    const ordersPending = useMemo(() => {
        return orders.filter(order => order.status === 'pending').map(order => order.number);
    }, [orders]);

    return (
        <div className={styles.wrapper}>
            <h1 className="text text_type_main-large mb-5 mt-10">Лента заказов</h1>
            <div className={styles.container}>
                <section className={styles.orders}>
                    { orders.length
                        ? <OrderList page={'feed'} orders={orders} />
                        : <div><p className="text text_type_main-medium">Загрузка...</p></div>
                    }
                </section>
                <section className={styles.stats}>
                    { orders.length
                        ? <OrderStats total={total} totalToday={totalToday} ordersDone={ordersDone} ordersPending={ordersPending} />
                        : <div><p className="text text_type_main-medium">Загрузка...</p></div>
                    }
                </section>
            </div>
            
        </div>
    );
}

export default FeedPage;