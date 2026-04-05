import { useIngredientDetails } from '@hooks/useIngredientDetails.ts';

import type { ReactNode } from 'react';

import styles from './ingredient-details.module.css';

export default function IngredientDetails(): ReactNode {
  console.log('details');
  const { ingredientDetails } = useIngredientDetails();
  if (!ingredientDetails) return null;
  return (
    <div className={styles.container}>
      <img
        className={`${styles.image} mb-4`}
        src={ingredientDetails.image}
        alt={ingredientDetails.name}
      />
      <p className="text text_type_main-medium mb-8">{ingredientDetails.name}</p>
      <ul
        className={`${styles.ingredient_details} text text_type_main-default text_color_inactive`}
      >
        <li>
          <span>Калории,ккал</span>
          <span>{ingredientDetails.calories}</span>
        </li>
        <li>
          <span>Белки, г</span>
          <span>{ingredientDetails.proteins}</span>
        </li>
        <li>
          <span>Жиры, г</span>
          <span>{ingredientDetails.fat}</span>
        </li>
        <li>
          <span>Углеводы, г</span>
          <span>{ingredientDetails.carbohydrates}</span>
        </li>
      </ul>
    </div>
  );
}
