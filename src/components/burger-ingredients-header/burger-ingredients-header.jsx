import { Tab } from '@krgaa/react-developer-burger-ui-components';
import React from 'react';

import styles from './burger-ingredients-header.module.css';
function BurgerIngredientsHeader({
  tab,
  changeTab,
  ingredientsTypes,
  IngredientsTitles,
}) {
  return (
    <nav className={styles.menu}>
      {ingredientsTypes.map((typeInfo) => (
        <Tab
          key={typeInfo.id}
          value={typeInfo.type}
          active={tab === typeInfo.type}
          onClick={() => changeTab(typeInfo.type)}
        >
          {IngredientsTitles[typeInfo.type]}
        </Tab>
      ))}
    </nav>
  );
}
export default React.memo(BurgerIngredientsHeader);
