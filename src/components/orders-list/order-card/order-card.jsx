import styles from './styles.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { getFormattedDate } from '../../../utils/date-format';
import ComponentAvatarGroup from '../avatar-group/avatar-group';

function OrderCard({ id, date, name, ingredients, price, status }) {

    return (
        <article className={styles.card}>
            <div className={styles.top_details}>
                <div><p className="text text_type_digits-default">#{id}</p></div>
                <div className={styles.date}>
                    <p className="text text_type_main-small">{getFormattedDate(date)}</p>
                </div>
            </div>
            <div className={styles.heading}>
                <h3 className="text text_type_main-medium">{name}</h3>
            </div>
            { status && <div className={styles.status}>
                    <p className="text text_type_main-small">{status}</p>
                </div>
            }
            <div className={styles.bottom_details}>
                <ComponentAvatarGroup items={ingredients} max={6} />
                <div className={styles.price}>
                    <p className="text text_type_digits-default mr-2">{price}</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </article>
    );
}

export default OrderCard;