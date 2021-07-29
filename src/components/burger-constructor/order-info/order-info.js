import React from "react";
import PropTypes from 'prop-types';
import styles from './order-info.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

function OrderInfo({ total, onModalOpen }) {

    const onClick = () => {
        onModalOpen(<div></div>);
    }

    return (
        <div className={styles.order_info}>
            <div className={styles.total}>
                <p className="text text_type_digits-medium mr-2">{total}</p>
                <CurrencyIcon type="primary" />
            </div>
            <div className={styles.submit}>
                <Button type="primary" size="large" onClick={onClick}>
                    Оформить заказ
                </Button>
            </div>
        </div>
    );
}

OrderInfo.propTypes = {
    total: PropTypes.number.isRequired,
    onModalOpen: PropTypes.func.isRequired
}

export default React.memo(OrderInfo);