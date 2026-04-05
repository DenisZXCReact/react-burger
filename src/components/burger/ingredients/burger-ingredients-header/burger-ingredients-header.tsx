import { Tab } from '@krgaa/react-developer-burger-ui-components';
import React, { type ReactNode } from 'react';

import type { TIngredientType } from '@/types/types.ts';
import type {
  TChangeTab,
  TIngredientsTabTypes,
  TIngredientsTitles,
} from '@hooks/useIngredients.ts';

import styles from './burger-ingredients-header.module.css';

type TBurgerIngredientsHeader = ({
  tab,
  changeTab,
  ingredientsTabTypes,
  IngredientsTitles,
}: {
  tab: TIngredientType;
  changeTab: TChangeTab;
  ingredientsTabTypes: TIngredientsTabTypes;
  IngredientsTitles: TIngredientsTitles;
}) => ReactNode;

const BurgerIngredientsHeader: TBurgerIngredientsHeader = ({
  tab,
  changeTab,
  ingredientsTabTypes,
  IngredientsTitles,
}) => {
  return (
    <nav className={styles.menu}>
      {ingredientsTabTypes.map((typeInfo) => (
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
};
export default React.memo(BurgerIngredientsHeader);
