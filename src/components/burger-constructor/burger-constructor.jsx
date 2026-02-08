import { useLayoutEffect, useRef } from 'react';

import BurgerConstructorBottom from '@components/burger-constructor-bottom/burger-constructor-bottom.jsx';
import ConstructorBuns from '@components/constructor-buns/constructor-buns.jsx';
import ConstructorItem from '@components/constructor-item/constructor-item.jsx';
import ScrollableContainer from '@components/scrollable-container/scrollable-container.jsx';
import calcConstructorListHeight from '@utils/calcConstructorListHeight.js';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = ({
  burgerBun,
  burgerIngredients,
  burgerPrice,
  deleteIngredient,
}) => {
  const ingredientsListEl = useRef(null);
  useLayoutEffect(() => {
    const el = ingredientsListEl.current;
    if (!el) return;
    calcConstructorListHeight(el);
  }, []);

  return (
    <section className={styles.burger_constructor}>
      <ConstructorBuns bun={burgerBun}>
        <ScrollableContainer
          ref={ingredientsListEl}
          className={`${styles.constructor_list} pr-2`}
        >
          {burgerIngredients.map((ingredientInfo) => (
            <ConstructorItem
              key={ingredientInfo.id}
              itemId={ingredientInfo.id}
              ingredient={ingredientInfo.ingredient}
              handleClose={deleteIngredient}
            />
          ))}
        </ScrollableContainer>
      </ConstructorBuns>
      <BurgerConstructorBottom burgerPrice={burgerPrice} />
    </section>
  );
};
