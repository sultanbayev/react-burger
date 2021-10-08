import styles from './styles.module.css';
import OrderCard from './order-card/order-card';

function OrderList({ orders }) {
    return (
        <div className={styles.list}>
            { orders.map(order => {
                    return (
                        <div key={order.id} className="mt-4">
                            <OrderCard
                                id={order.id}
                                date={order.date}
                                name={order.name}
                                ingredients={order.ingredients}
                                price={order.price}
                                status={order.status}
                            />
                        </div> );
                        
                }) 
            }
        </div>
    );
}

export default OrderList;