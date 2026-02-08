import { ConstructorElement } from '@krgaa/react-developer-burger-ui-components';

import IngredientPreview from '@components/ingredient-preview/ingredient-preview.jsx';

import styles from './constructor-buns.module.css';
export default function ConstructorBuns({ bun, children }) {
  return (
    <>
      {bun ? (
        <IngredientPreview className={`${styles.bun} mb-4 mr-4`} ingredient={bun}>
          <ConstructorElement
            isLocked
            price={bun.price}
            text={`${bun.name} (верх)`}
            thumbnail={bun.image}
            type="top"
          />
        </IngredientPreview>
      ) : (
        <div className="mb-4 mr-4" style={{ height: 80, flexShrink: 0 }}></div>
      )}
      {children}
      {bun ? (
        <IngredientPreview className={`${styles.bun} mb-10 mt-4 mr-4`} ingredient={bun}>
          <ConstructorElement
            isLocked
            price={bun.price}
            text={`${bun.name} (верх)`}
            thumbnail={bun.image}
            type="bottom"
          />
        </IngredientPreview>
      ) : (
        <div className="mb-10 mt-4 mr-4" style={{ height: 80, flexShrink: 0 }}></div>
      )}
    </>
  );
}
