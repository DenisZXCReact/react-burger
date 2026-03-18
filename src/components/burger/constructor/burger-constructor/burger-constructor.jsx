import { useLayoutEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import BurgerConstructorBottom from '@components/burger/constructor/burger-constructor-bottom/burger-constructor-bottom.jsx';
import ConstructorBuns from '@components/burger/constructor/constructor-buns/constructor-buns.jsx';
import ConstructorItem from '@components/burger/constructor/constructor-item/constructor-item.jsx';
import DropPlaceholder from '@components/drag-and-drop/drop-placeholder/drop-placeholder.jsx';
import DropWrapper from '@components/drag-and-drop/drop-wrapper/drop-wrapper.jsx';
import ScrollableContainer from '@components/scrollable-container/scrollable-container.jsx';
import useDnDForBurgerIngredients from '@hooks/useDnDForBurgerIngredients.js';
import { getBurgerIngredients } from '@services/burder-ingredients/burder-ingredients-selectors.js';
import calcConstructorListHeight from '@utils/calcConstructorListHeight.js';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = () => {
  const ingredientsListEl = useRef(null);
  useLayoutEffect(() => {
    const el = ingredientsListEl.current;
    if (!el) return;
    calcConstructorListHeight(el);
  }, []);
  const burgerIngredients = useSelector(getBurgerIngredients);

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
