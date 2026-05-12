import { type ReactNode, useLayoutEffect, useRef } from 'react';

import BurgerConstructorBottom from '@components/burger/constructor/burger-constructor-bottom/burger-constructor-bottom.js';
import ConstructorBuns from '@components/burger/constructor/constructor-buns/constructor-buns.js';
import ConstructorItem from '@components/burger/constructor/constructor-item/constructor-item.js';
import DropPlaceholder from '@components/drag-and-drop/drop-placeholder/drop-placeholder.js';
import DropWrapper from '@components/drag-and-drop/drop-wrapper/drop-wrapper.js';
import ScrollableContainer from '@components/scrollable-container/scrollable-container.js';
import { useAppSelector } from '@hooks/useAppSelector.ts';
import useDnDForBurgerIngredients from '@hooks/useDnDForBurgerIngredients.ts';
import { getBurgerIngredients } from '@services/burder-ingredients/burder-ingredients-selectors.ts';
import calcConstructorListHeight from '@utils/calcConstructorListHeight.ts';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = (): ReactNode => {
  const ingredientsListEl = useRef(null);
  useLayoutEffect(() => {
    const el = ingredientsListEl.current;
    if (!el) return;
    calcConstructorListHeight(el);
  }, []);
  const burgerIngredients = useAppSelector(getBurgerIngredients);

  const { onDropHandler, dndName } = useDnDForBurgerIngredients();
  return (
    <section className={styles.burger_constructor}>
      <ConstructorBuns>
        <ScrollableContainer
          ref={ingredientsListEl}
          className={`${styles.constructor_scroll_container} pr-2`}
        >
          {burgerIngredients.length === 0 ? (
            <DropPlaceholder
              accept={dndName}
              text="Выберите начинку"
              className={styles.constructor_placeholder}
              onDrop={onDropHandler}
            />
          ) : (
            <DropWrapper
              onDrop={onDropHandler}
              accept={dndName}
              className={styles.constructor_list}
            >
              {burgerIngredients.map((ingredient) => (
                <ConstructorItem key={ingredient.key} ingredient={ingredient} />
              ))}
            </DropWrapper>
          )}
        </ScrollableContainer>
      </ConstructorBuns>
      <BurgerConstructorBottom />
    </section>
  );
};
