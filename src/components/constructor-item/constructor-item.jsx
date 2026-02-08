import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import React from 'react';

import IngredientPreview from '@components/ingredient-preview/ingredient-preview.jsx';

import styles from './constructor-item.module.css';
function ConstructorItem({ ingredient, handleClose, itemId }) {
  return (
    <IngredientPreview className={styles.constructor_item} ingredient={ingredient}>
      <DragIcon className={styles.drag} type="primary" />
      <ConstructorElement
        price={ingredient.price}
        text={ingredient.name}
        thumbnail={ingredient.image}
        handleClose={(e) => {
          e.stopPropagation();
          handleClose(itemId);
        }}
      />
    </IngredientPreview>
  );
}
export default React.memo(ConstructorItem);
