import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import React from 'react';
import { useDrag } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';

import { getBurgerIngredientCountById } from '@services/burder-ingredients/burder-ingredients-selectors.js';
import { addBurgerIngredient } from '@services/burder-ingredients/burder-ingredients-slice.js';

import styles from './ingredient-card.module.css';

function IngredientCard({ ingredient }) {
  const dispatch = useDispatch();
  const addIngredient = () => dispatch(addBurgerIngredient(ingredient));
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
    <article className={styles.card} onClick={addIngredient} ref={dragRef}>
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
    </article>
  );
}
export default React.memo(IngredientCard);
