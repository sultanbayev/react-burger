import styles from './styles.module.css';
import React, { useEffect, FC } from 'react';
import ConfirmedLogo from '../../../assets/images/confirm-order.svg';
import { useDispatch } from '../../../services/hooks';
import { resetOrder } from '../../../services/actions/order';

interface IOrderDetailsProps {
    orderNumber: string;
}

const OrderDetails: FC<IOrderDetailsProps> = ({ orderNumber }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(resetOrder());
        }
    //eslint-disable-next-line
    }, [])

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

export default React.memo(OrderDetails);