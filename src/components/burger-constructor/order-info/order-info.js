import React, { useContext, useMemo, useState, useEffect } from "react";
import PropTypes from 'prop-types';
import styles from './order-info.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../../modal/order-details/order-details';
import { ModalContext } from "../../../contexts";
import { ORDERS_URL } from '../../../constants/constants';
import { BurgerConstructorContext } from "../../../contexts";

function OrderInfo({ total }) {
    const { onModalOpen } = useContext(ModalContext);
    const [orderState, setOrderState] = useState({
        isLoading: false,
        isFailed: false,
    });

    const { componentsState } = useContext(BurgerConstructorContext);

    const ingredientsToSend = useMemo(() => {
        if (componentsState.bun && componentsState.staffings.length !== 0) {
            const staffingIds = componentsState.staffings.map(c => c._id)
            return { ingredients: [componentsState.bun._id, componentsState.bun._id, ...staffingIds]}
        }
        return null;
    }, [componentsState])

    useEffect(() => {
        if (!ingredientsToSend) return;
        if (!orderState.isLoading) return;
        try {
            fetch(ORDERS_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                  },
                body: JSON.stringify(ingredientsToSend)
            })
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    }
                    return Promise.reject(response);
                })
                .then(data => {
                    if (data.success) {
                        setOrderState({
                            ...orderState,
                            isLoading: false,
                            isFailed: false,
                        });
                        onModalOpen(<OrderDetails orderNumber={data.order.number} />);
                    } else {
                        setOrderState({
                            ...orderState,
                            isLoading: false,
                            isFailed: true,
                        })
                    }
                })
        } catch (error) {
            setOrderState({
                ...orderState,
                isLoading: false,
                isFailed: true,
            });
            console.log("Что-то пошло не так c заказом.", error);
        }
    }, [ingredientsToSend, orderState])

    const onClick = () => {
        setOrderState({
            ...orderState,
            isLoading: true,
        });
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