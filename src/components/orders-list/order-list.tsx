import styles from './styles.module.css';
import React, { memo } from 'react';
import OrderCard from './order-card/order-card';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { TOrder } from '../../services/types/data';

interface IOrderListProps {
    orders: TOrder[];
    page: string;
    withStatus?: boolean
}

const OrderList: React.FC<IOrderListProps> = ({ orders, page, withStatus }) => {

    const location = useLocation();

    return (
        <div className={styles.list}>
            { orders && orders.map(order => {
                    return (
                        <Link
                            key={order._id} 
                            to={{
                                pathname: `/${page}/${order._id}`,
                                state: {
                                    background: location,
                                    order: order
                                },
                            }} >
                            <article className={styles.card}>
                                <OrderCard
                                    number={order.number}
                                    createdAt={order.createdAt}
                                    name={order.name}
                                    ingredients={order.ingredients}
                                    status={ ( withStatus && order.status) || undefined }
                                />
                            </article>
                        </Link>
                    );
                })
            }
        </div>
    );
}

export default memo(OrderList);