import React from "react";
import styles from './burger-ingredients.module.css';
import TabBar from './tab-bar/TabBar';
import IngredientGroup from './ingredient-group/IngredientGroup';
import IngredientCard from './ingredient-card/IngredientCard';
import data from '../../utils/data';

function BurgerIngredients() {
    const ingredients = data.map(ingredient => {
        return {
            ...ingredient,
            count: 1
        };
    })

    return (
        <section className={styles.burger_ingredients}>
            <h1 className="text text_type_main-large mb-5 mt-10">Соберите бургер</h1>
            <TabBar />
            <section className={styles.container}>
                <IngredientGroup name="Булки">
                    {
                        ingredients
                            .filter((ingredient) => ingredient.type === 'bun')
                            .map(ingredient => <IngredientCard
                                key={ingredient._id}
                                name={ingredient.name}
                                image={ingredient.image}
                                price={ingredient.price}
                                count={ingredient.count}
                            />)
                    }
                </IngredientGroup>
                <IngredientGroup name="Соусы">
                    {
                        ingredients
                            .filter((ingredient) => ingredient.type === 'sauce')
                            .map(ingredient => <IngredientCard
                                key={ingredient._id}
                                name={ingredient.name}
                                image={ingredient.image}
                                price={ingredient.price}
                                count={ingredient.count}
                            />)
                    }
                </IngredientGroup>
                <IngredientGroup name="Начинка">
                    {
                        ingredients
                            .filter((ingredient) => ingredient.type === 'main')
                            .map(ingredient => <IngredientCard
                                key={ingredient._id}
                                name={ingredient.name}
                                image={ingredient.image}
                                price={ingredient.price}
                                count={ingredient.count}
                            />
                            )
                    }
                </IngredientGroup>
            </section>
        </section>
    );
}

export default BurgerIngredients;