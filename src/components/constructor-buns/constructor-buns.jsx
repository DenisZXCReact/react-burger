import { ConstructorElement } from '@krgaa/react-developer-burger-ui-components';
import { useDrop } from 'react-dnd';
import { useSelector } from 'react-redux';

import DropPlaceholder from '@components/drag-and-drop/drop-placeholder/drop-placeholder.jsx';
import IngredientPreview from '@components/ingredient-preview/ingredient-preview.jsx';
import useDnDForBurgerIngredients from '@hooks/useDnDForBurgerIngredients.js';
import { getBurgerBun } from '@services/burder-ingredients/burder-ingredients-selectors.js';

import styles from './constructor-buns.module.css';

export default function ConstructorBuns({ children }) {
  const bun = useSelector(getBurgerBun);
  const { dndName, onDropHandler } = useDnDForBurgerIngredients();
  const [, dropBunTop] = useDrop({
    accept: dndName,
    drop: onDropHandler,
  });
  const [, dropBunBottom] = useDrop({
    accept: dndName,
    drop: onDropHandler,
  });
  return (
    <>
      {bun.name ? (
        <div className={`${styles.bun} mb-4 mr-4`} ref={dropBunTop}>
          <IngredientPreview ingredient={bun}>
            <ConstructorElement
              isLocked
              price={bun.price}
              text={`${bun.name} (верх)`}
              thumbnail={bun.image}
              type="top"
            />
          </IngredientPreview>
        </div>
      ) : (
        <DropPlaceholder
          className="mb-4 mr-4"
          customStyles={{ height: 80, width: 536, flexShrink: 0 }}
          accept={dndName}
          type="top"
          text="Выберите булки"
          onDrop={onDropHandler}
        />
      )}
      {children}
      {bun.name ? (
        <div ref={dropBunBottom} className={`${styles.bun} mb-10 mt-4 mr-4`}>
          <IngredientPreview ingredient={bun}>
            <ConstructorElement
              isLocked
              price={bun.price}
              text={`${bun.name} (верх)`}
              thumbnail={bun.image}
              type="bottom"
            />
          </IngredientPreview>
        </div>
      ) : (
        <DropPlaceholder
          className="mb-10 mt-4 mr-4"
          customStyles={{ height: 80, width: 536, flexShrink: 0 }}
          accept={dndName}
          type="bottom"
          text="Выберите булки"
          onDrop={onDropHandler}
        />
      )}
    </>
  );
}
