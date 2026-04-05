import { Link, useLocation } from 'react-router-dom';

import BurgerIngredientsHeader from '@components/burger/ingredients/burger-ingredients-header/burger-ingredients-header.js';
import IngredientCard from '@components/burger/ingredients/ingredient-card/ingredient-card.js';
import IngredientsGroup from '@components/burger/ingredients/ingredients-group/ingredients-group.js';
import ScrollableContainer from '@components/scrollable-container/scrollable-container.js';
import { useAppDispatch } from '@hooks/useAppDispatch.ts';
import useIngredients from '@hooks/useIngredients.ts';
import { setIngredientDetails } from '@services/details-modal/ingredient-details-slice.ts';

import type { ReactNode } from 'react';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = (): ReactNode => {
  const {
    tab,
    changeTab,
    ingredientsTabTypes,
    IngredientsTitles,
    filteredIngredients,
    scrollContainerRef,
    titlesRef,
  } = useIngredients();

  const location = useLocation();

  const dispatch = useAppDispatch();

  return (
    <section className={styles.burger_ingredients}>
      <BurgerIngredientsHeader
        ingredientsTabTypes={ingredientsTabTypes}
        IngredientsTitles={IngredientsTitles}
        changeTab={changeTab}
        tab={tab}
      />
      <ScrollableContainer
        className={`${styles.burger_ingredients_container} group_container`}
        ref={scrollContainerRef}
      >
        {ingredientsTabTypes.map((typeInfo) => (
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
