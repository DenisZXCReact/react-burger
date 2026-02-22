import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import React from 'react';
import { useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';

import DropWrapper from '@components/drag-and-drop/drop-wrapper/drop-wrapper.jsx';
import IngredientPreview from '@components/ingredient-preview/ingredient-preview.jsx';
import useDnDForBurgerIngredients from '@hooks/useDnDForBurgerIngredients.js';
import { deleteBurgerIngredientByKey } from '@services/burder-ingredients/burder-ingredients-slice.js';

import styles from './constructor-item.module.css';

function ConstructorItem({ ingredient }) {
  console.log('render: ', ingredient);
  const dispatch = useDispatch();
  const deleteIngredient = () => dispatch(deleteBurgerIngredientByKey(ingredient.key));
  const { onDropHandler, dndName } = useDnDForBurgerIngredients(ingredient.key);
  const [{ dragging }, dragRef] = useDrag({
    type: dndName,
    item: {
      source: 'constructor',
      key: ingredient.key,
    },
    collect: (monitor) => ({
      dragging: monitor.isDragging(),
    }),
  });
  return (
    <DropWrapper
      accept={dndName}
      onDrop={onDropHandler}
      onHover={onDropHandler}
      customStyles={{ width: '100%' }}
    >
      <div
        ref={dragRef}
        className={styles.constructor_item}
        style={{ opacity: dragging ? 0 : 1 }}
      >
        <DragIcon className={styles.drag} type="primary" />

        <IngredientPreview
          ingredient={ingredient}
          className={styles.constructor_preview}
        >
          <ConstructorElement
            price={ingredient.price}
            text={ingredient.name}
            thumbnail={ingredient.image}
            handleClose={(e) => {
              e.stopPropagation();
              deleteIngredient();
            }}
          />
        </IngredientPreview>
      </div>
    </DropWrapper>
  );
}
export default React.memo(ConstructorItem);
