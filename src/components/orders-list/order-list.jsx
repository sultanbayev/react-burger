import styles from './styles.module.css';
import { memo } from 'react';
import OrderCard from './order-card/order-card';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function OrderList({ orders, page, withStatus }) {

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

OrderList.propTypes = {
    orders: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        number: PropTypes.number.isRequired,
        createdAt: PropTypes.string.isRequired,
        updatedAt: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        ingredients: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    })),
    withStatus: PropTypes.bool,
    page: PropTypes.string.isRequired,
}

export default memo(OrderList);