import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './style.module.css';

function HomePage() {
    return (
        <DndProvider backend={HTML5Backend}>
            <div className={styles.wrapper}>
                <BurgerIngredients />
                <BurgerConstructor />
            </div>
        </DndProvider>
    )
    
}

export default HomePage;