import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import BurgerIngredientsHeader from '@components/burger/ingredients/burger-ingredients-header/burger-ingredients-header.jsx';
import IngredientCard from '@components/burger/ingredients/ingredient-card/ingredient-card.jsx';
import IngredientsGroup from '@components/burger/ingredients/ingredients-group/ingredients-group.jsx';
import ScrollableContainer from '@components/scrollable-container/scrollable-container.jsx';
import useIngredients from '@hooks/useIngredients.js';
import { setIngredientDetails } from '@services/details-modal/ingredient-details-slice.js';

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

  const location = useLocation();

  const dispatch = useDispatch();

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
              <Link
                to={`/ingredient/${ingredient._id}`}
                state={{ backgroundLocation: location }}
                key={ingredient._id}
                onClick={() => {
                  dispatch(setIngredientDetails(ingredient));
                }}
              >
                <IngredientCard ingredient={ingredient} />
              </Link>
            ))}
          </IngredientsGroup>
        ))}
      </ScrollableContainer>
    </section>
  );
};
