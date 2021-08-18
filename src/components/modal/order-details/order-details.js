import styles from './styles.module.css';
import ConfirmedLogo from '../../../images/confirm-order.svg';
import { useSelector } from 'react-redux';

function OrderDetails() {

    const order = useSelector(store => store.order);

    return (
        <div className={styles.container}>
            {
                order.orderRequest
                ? <h2 className={'text text_type_main-large mb-8 ' + styles.order_number}>Загрузка...</h2>
                : order.orderFailed
                ? <h2 className={'text text_type_main-large mb-8 ' + styles.order_number}>Ошибка запроса</h2>
                : <h2 className={'text text_type_digits-large mb-8 ' + styles.order_number}>{order.number}</h2>
            }
            <p className='text text_type_main-medium'>идентификатор заказа</p>
            <div className='mt-15 mb-15'>
                <img src={ConfirmedLogo} alt="React Logo" />
            </div>
            <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
        </div>
    );
}

export default OrderDetails;