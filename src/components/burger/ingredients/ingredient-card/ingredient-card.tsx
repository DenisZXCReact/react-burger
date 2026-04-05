import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import React, { type ReactNode, type Ref } from 'react';
import { useDrag } from 'react-dnd';

import { useAppSelector } from '@hooks/useAppSelector.ts';
import { getBurgerIngredientCountById } from '@services/burder-ingredients/burder-ingredients-selectors.ts';

import type { TIngredient } from '@/types/types.ts';

import styles from './ingredient-card.module.css';

function IngredientCard({ ingredient }: { ingredient: TIngredient }): ReactNode {
  const count = useAppSelector((state) =>
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
    <article ref={dragRef as unknown as Ref<HTMLDivElement>} className={styles.card}>
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
