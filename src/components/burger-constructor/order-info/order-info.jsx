import { useMemo } from "react";
import styles from './styles.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from "react-redux";
import { fetchOrder } from '../../../services/actions/order';
import { useHistory } from 'react-router-dom';

function OrderInfo() {

    const dispatch = useDispatch();
    const { bun, staffings } = useSelector(store => store.burgerConstructor);
    const { orderRequest } = useSelector(store => store.order);
    const { isAuthorised } = useSelector(store => store.user);

    const ingredientsToSend = useMemo(() => {
        if (bun && staffings.length !== 0) {
            const staffingIds = staffings.map(c => c._id)
            return [
                bun._id,
                bun._id,
                ...staffingIds
            ];
        }
        return null;
    }, [bun, staffings]);

    const history = useHistory();

    const handleClick = () => {
        if (!isAuthorised) {
            history.push('/login');
        } else {
            if (ingredientsToSend) {
                dispatch(fetchOrder({
                    ingredients: ingredientsToSend
                }));
            }
        }
    }

    const totalPrice = useMemo(() => {
        const bunPrice = bun ? bun.price * 2 : 0;
        const staffingsTotalPrice = staffings.reduce((total, i) => total + i.price, 0);
        return bunPrice + staffingsTotalPrice;
    }, [bun, staffings]);

    return (
        <div>
            <div className={styles.messages}>
                { orderRequest && <p className="text text_type_main-default mt-6">Отправка заказа...</p> } 
            </div>
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
        </div>
    );
}

export default OrderInfo;