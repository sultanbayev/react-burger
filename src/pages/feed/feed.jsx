import styles from './style.module.css';
import OrderList from '../../components/orders-list/order-list';

function FeedPage() {

    const orders = [
        {
            id: '034535',
            date: "2021-06-23T14:43:22.587Z",
            name: 'Death Star Starship Main бургер',
            ingredients: [
                {
                    id: '60d3b41abdacab0026a733c7',
                    name: 'Флюоресцентная булка R2-D3',
                    image: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
                    price: 988,
                    count: 2,
                },
                {
                    id: '60d3b41abdacab0026a733c8',
                    name: 'Филе Люминесцентного тетраодонтимформа',
                    image: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
                    price: 988,
                    count: 1,
                },
                {
                    id: '60d3b41abdacab0026a733d2',
                    name: 'Кристаллы марсианских альфа-сахаридов',
                    image: 'https://code.s3.yandex.net/react/code/core-mobile.png',
                    price: 762,
                    count: 1,
                },
                {
                    id: '60d3b41abdacab0026a733d0',
                    name: 'Хрустящие минеральные кольца',
                    image: 'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
                    price: 300,
                    count: 1,
                },
                {
                    id: '60d3b41abdacab0026a733ce',
                    name: 'Соус традиционный галактический',
                    image: 'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
                    price: 15,
                    count: 1,
                },
                {
                    id: '60d3b41abdacab0026a733d4',
                    name: 'Сыр с астероидной плесенью',
                    image: 'https://code.s3.yandex.net/react/code/cheese-mobile.png',
                    price: 4142,
                    count: 1,
                },
                {
                    id: '60d3b41abdacab0026a733d4',
                    name: 'Сыр с астероидной плесенью',
                    image: 'https://code.s3.yandex.net/react/code/cheese-mobile.png',
                    price: 4142,
                    count: 1,
                },
                {
                    id: '60d3b41abdacab0026a733d4',
                    name: 'Сыр с астероидной плесенью',
                    image: 'https://code.s3.yandex.net/react/code/cheese-mobile.png',
                    price: 4142,
                    count: 1,
                },
            ],
            price: 480,
            status: 'Создан'
        },
        {
            id: '034536',
            date: new Date(),
            name: 'Interstellar бургер',
            ingredients: [
                {
                    id: '60d3b41abdacab0026a733c7',
                    name: 'Флюоресцентная булка R2-D3',
                    image: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
                    price: 988,
                    count: 2,
                },
                {
                    id: '60d3b41abdacab0026a733c8',
                    name: 'Филе Люминесцентного тетраодонтимформа',
                    image: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
                    price: 988,
                    count: 1,
                },
                {
                    id: '60d3b41abdacab0026a733d2',
                    name: 'Кристаллы марсианских альфа-сахаридов',
                    image: 'https://code.s3.yandex.net/react/code/core-mobile.png',
                    price: 762,
                    count: 1,
                },
                {
                    id: '60d3b41abdacab0026a733d0',
                    name: 'Хрустящие минеральные кольца',
                    image: 'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
                    price: 300,
                    count: 1,
                },
                {
                    id: '60d3b41abdacab0026a733ce',
                    name: 'Соус традиционный галактический',
                    image: 'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
                    price: 15,
                    count: 1,
                },
                {
                    id: '60d3b41abdacab0026a733d4',
                    name: 'Сыр с астероидной плесенью',
                    image: 'https://code.s3.yandex.net/react/code/cheese-mobile.png',
                    price: 4142,
                    count: 1,
                },
                {
                    id: '60d3b41abdacab0026a733d4',
                    name: 'Сыр с астероидной плесенью',
                    image: 'https://code.s3.yandex.net/react/code/cheese-mobile.png',
                    price: 4142,
                    count: 1,
                },
                {
                    id: '60d3b41abdacab0026a733d4',
                    name: 'Сыр с астероидной плесенью',
                    image: 'https://code.s3.yandex.net/react/code/cheese-mobile.png',
                    price: 4142,
                    count: 1,
                },
            ],
            price: 560,
            status: 'Создан'
        },
        {
            id: '034537',
            date: new Date(),
            name: 'Black Hole Singularity острый бургер',
            ingredients: [
                {
                    id: '60d3b41abdacab0026a733c7',
                    name: 'Флюоресцентная булка R2-D3',
                    image: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
                    price: 988,
                    count: 2,
                },
                {
                    id: '60d3b41abdacab0026a733c8',
                    name: 'Филе Люминесцентного тетраодонтимформа',
                    image: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
                    price: 988,
                    count: 1,
                },
                {
                    id: '60d3b41abdacab0026a733d2',
                    name: 'Кристаллы марсианских альфа-сахаридов',
                    image: 'https://code.s3.yandex.net/react/code/core-mobile.png',
                    price: 762,
                    count: 1,
                },
                {
                    id: '60d3b41abdacab0026a733d0',
                    name: 'Хрустящие минеральные кольца',
                    image: 'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
                    price: 300,
                    count: 1,
                },
                {
                    id: '60d3b41abdacab0026a733ce',
                    name: 'Соус традиционный галактический',
                    image: 'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
                    price: 15,
                    count: 1,
                },
                {
                    id: '60d3b41abdacab0026a733d4',
                    name: 'Сыр с астероидной плесенью',
                    image: 'https://code.s3.yandex.net/react/code/cheese-mobile.png',
                    price: 4142,
                    count: 1,
                },
            ],
            price: 510,
            status: 'Создан'
        },
        {
            id: '034538',
            date: new Date(),
            name: 'Supernova Infinity бургер',
            ingredients: [
                {
                    id: '60d3b41abdacab0026a733c7',
                    name: 'Флюоресцентная булка R2-D3',
                    image: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
                    price: 988,
                    count: 2,
                },
                {
                    id: '60d3b41abdacab0026a733c8',
                    name: 'Филе Люминесцентного тетраодонтимформа',
                    image: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
                    price: 988,
                    count: 1,
                },
                {
                    id: '60d3b41abdacab0026a733d2',
                    name: 'Кристаллы марсианских альфа-сахаридов',
                    image: 'https://code.s3.yandex.net/react/code/core-mobile.png',
                    price: 762,
                    count: 1,
                },
                {
                    id: '60d3b41abdacab0026a733d0',
                    name: 'Хрустящие минеральные кольца',
                    image: 'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
                    price: 300,
                    count: 1,
                },
                {
                    id: '60d3b41abdacab0026a733ce',
                    name: 'Соус традиционный галактический',
                    image: 'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
                    price: 15,
                    count: 1,
                }
            ],
            price: 370,
            status: 'Создан'
        },
    ];

    return (
        <div className={styles.wrapper}>
            <h1 className="text text_type_main-large mb-5 mt-10">Лента заказов</h1>
            <section className={styles.orders}>
                <OrderList orders={orders} />
            </section>
        </div>
    );
}

export default FeedPage;