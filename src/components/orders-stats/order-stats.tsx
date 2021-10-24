import { memo, FC } from 'react';
import styles from './styles.module.css';
import OrderColumn from './order-column/order-column';

interface IOrderStatsProps {
    total: number;
    totalToday: number;
    ordersDone: number[];
    ordersPending: number[];
}

const OrderStats: FC<IOrderStatsProps> = ({ total, totalToday, ordersDone, ordersPending }) => {
    return (
        <div className={styles.container}>
            <div className={styles.statusContainer}>
                <div className={styles.list}>
                    <OrderColumn title={'Готовы'} orders={ordersDone} done />
                </div>
                <div className={styles.list}>
                    <OrderColumn title={'В работе'} orders={ordersPending} />
                </div>
            </div>
            <div className="mt-15">
                <h6 className="text text_type_main-medium">Выполнено за все время:</h6>
                <div className={styles.glow}><p className="text text_type_digits-large">{total}</p></div>
            </div>
            <div className="mt-15">
                <h6 className="text text_type_main-medium">Выполнено за сегодня:</h6>
                <div className={styles.glow}><p className="text text_type_digits-large">{totalToday}</p></div>
            </div>
        </div>
    );
}

export default memo(OrderStats);