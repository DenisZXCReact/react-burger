import { createSelector } from '@reduxjs/toolkit';

export const getBurgerBun = (state) => state.burgerIngredients.burgerBun;
export const getBurgerIngredients = (state) => state.burgerIngredients.ingredients;
export const getBurgerPrice = createSelector(
  [getBurgerBun, getBurgerIngredients],
  (bun, ingredients) => {
    const ingredientsPrice = ingredients.reduce(
      (acc, ingredient) => (acc += ingredient.price),
      0
    );
    return ingredientsPrice + (bun.price ?? 0) * 2;
  }
);
export const getBurgerIngredientCountById = createSelector(
  [getBurgerBun, getBurgerIngredients, (state, id) => id],
  (bun, ingredients, id) => {
    if (bun._id === id) return 2;
    return ingredients.reduce(
      (sum, ingredient) => (ingredient._id === id ? (sum += 1) : sum),
      0
    );
  }
);
export const getIngredientsForOrder = createSelector(
  [getBurgerBun, getBurgerIngredients],
  (bun, burgerIngredients) => {
    return {
      ingredients: [
        bun._id,
        ...burgerIngredients.map((ingredient) => ingredient._id),
        bun._id,
      ],
    };
  }
);
export const isBurgerReadyToOrder = (state) => {
  const bun = getBurgerBun(state);
  const ingredients = getBurgerIngredients(state);
  return !!(bun._id && ingredients.length > 0);
};
