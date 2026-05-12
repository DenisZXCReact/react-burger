import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import React, { type ReactNode, type Ref } from 'react';
import { useDrag } from 'react-dnd';

import DropWrapper from '@components/drag-and-drop/drop-wrapper/drop-wrapper.tsx';
import { useAppDispatch } from '@hooks/useAppDispatch.ts';
import useDnDForBurgerIngredients from '@hooks/useDnDForBurgerIngredients.ts';
import { deleteBurgerIngredientByKey } from '@services/burder-ingredients/burder-ingredients-slice.ts';

import type { TIngredientWithKey } from '@/types/types.ts';

import styles from './constructor-item.module.css';

function ConstructorItem({ ingredient }: { ingredient: TIngredientWithKey }): ReactNode {
  const dispatch = useAppDispatch();
  const deleteIngredient = (): void => {
    dispatch(deleteBurgerIngredientByKey(ingredient.key));
  };
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
        ref={dragRef as unknown as Ref<HTMLDivElement>}
        className={styles.constructor_item}
        style={{ opacity: dragging ? 0 : 1 }}
      >
        <DragIcon className={styles.drag} type="primary" />

        <ConstructorElement
          price={ingredient.price}
          text={ingredient.name}
          thumbnail={ingredient.image}
          handleClose={() => {
            deleteIngredient();
          }}
        />
      </div>
    </DropWrapper>
  );
}
export default React.memo(ConstructorItem);
