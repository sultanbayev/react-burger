import React, { useContext } from "react";
import PropTypes from 'prop-types';
import styles from './order-info.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../../modal/order-details/order-details';
import { ModalContext } from "../../app/context";

function OrderInfo({ total }) {
    const {onModalOpen} = useContext(ModalContext);

    const onClick = () => {
        onModalOpen(<OrderDetails orderNumber={'034536'} />);
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
}

export default React.memo(OrderInfo);