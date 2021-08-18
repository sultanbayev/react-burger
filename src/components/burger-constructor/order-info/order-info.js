import { useMemo } from "react";
import styles from './styles.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from "react-redux";
import { fetchOrder } from '../../../services/actions/order';
import { OPEN_MODAL_WITH_ORDER } from "../../../services/actions/modal";

function OrderInfo() {
    const dispatch = useDispatch();
    const { burgerConstructor, order } = useSelector(store => store);

    const ingredientsToSend = useMemo(() => {
        if (burgerConstructor.bun && burgerConstructor.staffings.length !== 0) {
            const staffingIds = burgerConstructor.staffings.map(c => c._id)
            return [burgerConstructor.bun._id, burgerConstructor.bun._id, ...staffingIds]
        }
        return null;
    }, [burgerConstructor])

    const handleClick = () => {
        if (ingredientsToSend) {
            dispatch(fetchOrder(ingredientsToSend));
            if (!order.orderFailed) {
                dispatch({ type: OPEN_MODAL_WITH_ORDER })
            }
        }
    }

    const totalPrice = useMemo(() => {
        const bunPrice = burgerConstructor.bun ? burgerConstructor.bun.price * 2 : 0;
        const staffingsTotalPrice = burgerConstructor.staffings.reduce((total, i) => total + i.price, 0);
        return bunPrice + staffingsTotalPrice;
    }, [burgerConstructor]);

    return (
        <div className={styles.order_info}>
            <div className={styles.total}>
                <p className="text text_type_digits-medium mr-2">{totalPrice}</p>
                <CurrencyIcon type="primary" />
            </div>
            <div className={styles.submit}>
                <Button type="primary" size="large" onClick={handleClick}>
                    Оформить заказ
                </Button>
            </div>
        </div>
    );
}

export default OrderInfo;