import { useMemo, useState, UIEvent} from "react";
import styles from './styles.module.css';
import TabBar from './tab-bar/tab-bar';
import IngredientGroup from './ingredient-group/ingredient-group';
import { useSelector } from '../../services/hooks';

function BurgerIngredients() {
    
    const { items } = useSelector(state => state.burgerIngredients);

    const buns = useMemo(() => {
        return items.filter(i => i.type === 'bun')
    }, [items]);

    const sauces = useMemo(() => {
        return items.filter(i => i.type === 'sauce')
    }, [items]);

    const mains = useMemo(() => {
        return items.filter(i => i.type === 'main')
    }, [items]);

    const [bunsHeight, setBunsHeights] = useState(0);
    const [saucesHeight, setSaucesHeights] = useState(0);
    const [mainsHeight, setMainsHeights] = useState(0);
    const [activeTab, setActiveTab] = useState('buns');

    const handleScroll = (e: UIEvent<HTMLDivElement>) => {
        const scrollTop = e.currentTarget.scrollTop;
        if (scrollTop >= 0 && scrollTop < bunsHeight) {
            setActiveTab('buns')
        } else if (scrollTop >= bunsHeight && scrollTop < bunsHeight + saucesHeight) {
            setActiveTab('sauces')
        } else if (scrollTop >= bunsHeight + saucesHeight && scrollTop < bunsHeight + saucesHeight + mainsHeight) {
            setActiveTab('mains')
        }
    }

    return (
        <section className={styles.container}>
            <h1 className="text text_type_main-large mb-5 mt-10">Соберите бургер</h1>
            <TabBar active={activeTab} />
            <section onScroll={handleScroll} className={styles.groups}>
                <IngredientGroup id='buns' setHeight={setBunsHeights} name="Булки" items={buns} />
                <IngredientGroup id='sauces' setHeight={setSaucesHeights} name="Соусы" items={sauces} />
                <IngredientGroup id='mains' setHeight={setMainsHeights} name="Начинка" items={mains} />
            </section>
        </section>
    );
}

export default BurgerIngredients;