import { useCallback, useEffect, useMemo, useState } from 'react';

function useBurger(ingredients) {
  const [burgerBun, setBurgerBun] = useState(false);
  const [burgerFilling, setBurgerFilling] = useState([]);
  let ingredientID = 1;

  useEffect(() => {
    if (ingredients) setBurgerBun(ingredients[0]);
  }, [ingredients]);

  function changeBurgerBun(newBun) {
    setBurgerBun((prevBun) =>
      prevBun._id === newBun._id || burgerBun ? prevBun : newBun
    );
  }

  const addIngredient = useCallback((ingredient) => {
    if (ingredient.type === 'bun') {
      changeBurgerBun(ingredient);
    } else {
      setBurgerFilling((prevFilling) => [
        ...prevFilling,
        newIngredient(prevFilling, ingredient),
      ]);
    }
  }, []);

  function newIngredient(prevFilling, ingredient) {
    const id = ingredientID;
    ingredientID += 1;
    return {
      id,
      order: prevFilling.length + 1,
      ingredient,
    };
  }

  const burgerPrice = useMemo(() => {
    return burgerFilling.reduce(
      (acc, ingredientInfo) => (acc += ingredientInfo.ingredient.price),
      burgerBun.price * 2 || 0
    );
  }, [burgerFilling, burgerBun]);

  const getIngredientCount = useCallback(
    (ingredient) => {
      if (ingredient.type === 'bun' && burgerBun._id === ingredient._id) return 1;

      return burgerFilling.reduce(
        (count, ingredientInfo) =>
          ingredientInfo.ingredient._id === ingredient._id ? (count += 1) : count,
        0
      );
    },
    [burgerFilling, burgerBun]
  );
  const deleteIngredient = useCallback((ingredientId) => {
    setBurgerFilling((prevFilling) => {
      return [
        ...prevFilling.filter((ingredientInfo) => ingredientInfo.id !== ingredientId),
      ];
    });
    correctIngredientsOrder();
  }, []);

  function correctIngredientsOrder() {
    setBurgerFilling((prevFilling) => [
      ...prevFilling.map((ingredientInfo, index) => ({
        ...ingredientInfo,
        order: index + 1,
      })),
    ]);
  }
  return {
    burgerBun,
    burgerFilling,
    addIngredient,
    burgerPrice,
    getIngredientCount,
    deleteIngredient,
  };
}

export default useBurger;
