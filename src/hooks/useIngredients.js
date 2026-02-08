import { useCallback, useMemo, useState } from 'react';

export default function useIngredients(ingredients) {
  const [tab, setTab] = useState('bun');
  const ingredientsTypes = useMemo(
    () => [
      { id: 1, type: 'bun' },
      { id: 2, type: 'sauce' },
      { id: 3, type: 'main' },
    ],
    []
  );

  const IngredientsTitles = useMemo(
    () => ({
      bun: 'Булки',
      sauce: 'Соусы',
      main: 'Начинка',
    }),
    []
  );
  const changeTab = useCallback((newTab) => {
    setTab(newTab);
    let ingredientsContainer = document.querySelector('.group_container');
    let groupBlock = document.querySelector(`#group-${newTab}`);
    ingredientsContainer.scrollTo({
      top: groupBlock.offsetTop - ingredientsContainer.offsetTop,
      behavior: 'smooth',
    });
  }, []);
  const filteredIngredients = useMemo(() => {
    return {
      bun: ingredients.filter((ingredient) => ingredient.type === 'bun'),
      sauce: ingredients.filter((ingredient) => ingredient.type === 'sauce'),
      main: ingredients.filter((ingredient) => ingredient.type === 'main'),
    };
  }, [ingredients]);

  return { tab, changeTab, ingredientsTypes, IngredientsTitles, filteredIngredients };
}
