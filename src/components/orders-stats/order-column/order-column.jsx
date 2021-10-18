import { memo } from 'react';
import styles from './styles.module.css';
import PropTypes from 'prop-types';

function OrderColumn({ title, orders, done }) {

    const columns = orders && [
        orders.slice(0, 10),
        orders.slice(10, 20),
        orders.slice(20, 30),
        orders.slice(30, 40),
        orders.slice(40, 50),
    ];

    return (
        <div className={styles.list}>
            <h6 className="text text_type_main-medium mb-6">{`${title}:`}</h6>
            <div className={styles.columns}>
                { columns && columns.filter(column => column.length !== 0).map((column, index) => {
                    return (
                        <div key={index} className={`${styles.column} ${ done && styles.done}`}>
                            { column.map((orderNumber, i) => {
                                return <p key={i} className="text text_type_digits-default mb-2">{orderNumber}</p>
                            }) }
                        </div>
                    );
                }) }
            </div>
        </div>
    );
}

OrderColumn.propTypes = {
    title: PropTypes.string.isRequired,
    orders: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    done: PropTypes.bool,
}

export default memo(OrderColumn);