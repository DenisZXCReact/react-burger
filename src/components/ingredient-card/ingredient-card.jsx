import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import React from 'react';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';

import IngredientPreview from '@components/ingredient-preview/ingredient-preview.jsx';
import { getBurgerIngredientCountById } from '@services/burder-ingredients/burder-ingredients-selectors.js';

import styles from './ingredient-card.module.css';

function IngredientCard({ ingredient }) {
  const count = useSelector((state) =>
    getBurgerIngredientCountById(state, ingredient._id)
  );
  const [, dragRef] = useDrag({
    type: 'burgerIngredients',
    item: {
      source: 'ingredients',
      ...ingredient,
    },
  });
  return (
    <article ref={dragRef}>
      <IngredientPreview ingredient={ingredient} className={styles.card}>
        {count > 0 && <Counter count={count} />}
        <div className={`${styles.card__image} pl-4 pr-4 mb-1`}>
          <img src={ingredient.image} alt={ingredient.name} />
        </div>
        <div className={`${styles.card__price} text text_type_digits-default mb-1`}>
          {ingredient.price}
          <CurrencyIcon type="primary" />
        </div>
        <p className={`${styles.card__title} text text_type_main-default`}>
          {ingredient.name}
        </p>
      </IngredientPreview>
    </article>
  );
}
export default React.memo(IngredientCard);
