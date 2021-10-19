import styles from './style.module.css';
import { useSelector } from 'react-redux';
import OrderList from '../../components/orders-list/order-list';

function ProfileOrdersPage() {

    const { orders } = useSelector(store => store.userOrders);

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