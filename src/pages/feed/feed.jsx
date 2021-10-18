import styles from './style.module.css';
import { useMemo } from 'react';
import OrderList from '../../components/orders-list/order-list';
import OrderStats from '../../components/orders-stats/order-stats';
import { useSelector } from 'react-redux';

function FeedPage() {
    
    const { orders, total, totalToday } = useSelector(store => store.orders);

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