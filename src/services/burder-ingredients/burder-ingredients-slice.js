import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  burgerBun: {},
  ingredients: [],
};

export const burgerIngredientsSlice = createSlice({
  name: 'burgerIngredients',
  initialState,
  reducers: {
    addBurgerIngredient: {
      reducer: (state, action) => {
        const ingredient = action.payload;
        if (ingredient.type === 'bun' && state.burgerBun._id === ingredient._id)
          return state;
        if (ingredient.type === 'bun') {
          state.burgerBun = ingredient;
          return;
        }
        state.ingredients.push(ingredient);
      },
      prepare: (ingredient) => {
        return {
          payload: { ...ingredient, key: nanoid() },
        };
      },
    },
    deleteBurgerIngredientByKey: (state, action) => {
      const key = action.payload;
      state.ingredients = state.ingredients.filter(
        (ingredientInfo) => ingredientInfo.key !== key
      );
    },
    swapBurgerIngredients: (state, action) => {
      const { fromKey, toKey } = action.payload;
      const fromIngredientIndex = state.ingredients.findIndex(
        (ingredient) => ingredient.key === fromKey
      );
      const toIngredientIndex = state.ingredients.findIndex(
        (ingredient) => ingredient.key === toKey
      );

      const fromIngredient = state.ingredients[fromIngredientIndex];
      const toIngredient = state.ingredients[toIngredientIndex];
      state.ingredients[toIngredientIndex] = fromIngredient;
      state.ingredients[fromIngredientIndex] = toIngredient;
    },
    resetBurger: () => {
      return initialState;
    },
  },
});

export const {
  addBurgerIngredient,
  deleteBurgerIngredientByKey,
  swapBurgerIngredients,
  resetBurger,
} = burgerIngredientsSlice.actions;
