import React from 'react';
import styles from './order-details.module.css';
import ConfirmedLogo from '../../../images/confirm-order.svg';
import PropTypes from 'prop-types';

function OrderDetails({orderNumber}) {
    return (
        <div className={styles.container}>
            <h2 className={'text text_type_digits-large mb-8 ' + styles.order_number}>{orderNumber}</h2>
            <p className='text text_type_main-medium'>идентификатор заказа</p>
            <div className='mt-15 mb-15'>
                <img src={ConfirmedLogo} alt="React Logo" />
            </div>
            <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
        </div>
    );
}

OrderDetails.propTypes = {
    orderNumber: PropTypes.string.isRequired
}

export default React.memo(OrderDetails);