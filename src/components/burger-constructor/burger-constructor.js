import styles from './styles.module.css';
import ComponentList from './component-list/component-list';
import OrderInfo from './order-info/order-info';

function BurgerConstructor() {

    return (
        <section className={styles.container}>
            <ComponentList />
            <OrderInfo />
        </section>
    );
}

export default BurgerConstructor;