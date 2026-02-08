import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import React from 'react';

import styles from './ingredient-card.module.css';

function IngredientCard({ ingredient, addBurgerIngredient, count }) {
  return (
    <article className={styles.card} onClick={() => addBurgerIngredient(ingredient)}>
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
