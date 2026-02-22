import BurgerIngredientsHeader from '@components/burger-ingredients-header/burger-ingredients-header.jsx';
import IngredientCard from '@components/ingredient-card/ingredient-card.jsx';
import IngredientsGroup from '@components/ingredients-group/ingredients-group.jsx';
import ScrollableContainer from '@components/scrollable-container/scrollable-container.jsx';
import useIngredients from '@hooks/useIngredients.js';

import styles from './burger-ingredients.module.css';
export const BurgerIngredients = () => {
  const {
    tab,
    changeTab,
    ingredientsTypes,
    IngredientsTitles,
    filteredIngredients,
    scrollContainerRef,
    titlesRef,
  } = useIngredients();
  return (
    <section className={styles.burger_ingredients}>
      <BurgerIngredientsHeader
        ingredientsTypes={ingredientsTypes}
        IngredientsTitles={IngredientsTitles}
        changeTab={changeTab}
        tab={tab}
      />
      <ScrollableContainer
        className={`${styles.burger_ingredients_container} group_container`}
        ref={scrollContainerRef}
      >
        {ingredientsTypes.map((typeInfo) => (
          <IngredientsGroup
            key={typeInfo.id}
            type={typeInfo.type}
            title={IngredientsTitles[typeInfo.type]}
            titleRef={titlesRef}
          >
            {filteredIngredients[typeInfo.type].map((ingredient) => (
              <IngredientCard key={ingredient._id} ingredient={ingredient} />
            ))}
          </IngredientsGroup>
        ))}
      </ScrollableContainer>
    </section>
  );
};
