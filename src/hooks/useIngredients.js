import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { getIngredients } from '@services/ingredients/ingredients-slice.js';

export default function useIngredients() {
  const ingredients = useSelector(getIngredients);
  const [tab, setTab] = useState('bun');
  const scrollContainerRef = useRef(null);
  const titlesRef = useRef({});
  const ingredientsTypes = useMemo(
    () => [
      { id: 1, type: 'bun' },
      { id: 2, type: 'sauce' },
      { id: 3, type: 'main' },
    ],
    []
  );
  useEffect(() => {
    function handleContainerScroll() {
      const titles = Object.values(titlesRef.current);
      const scrollContainerTop = scrollContainerRef.current.getBoundingClientRect().top;
      if (titles.length > 0) {
        let nearbyTitle = titles.reduce((closest, title, index) => {
          const titleRect = title.getBoundingClientRect();
          const titleTopOffset = Math.abs(titleRect.top - scrollContainerTop);

          if (!closest || titleTopOffset < closest.offset) {
            return {
              offset: titleTopOffset,
              type: ingredientsTypes[index].type,
            };
          }
          return closest;
        }, null);
        setTab((prevTab) => (prevTab === nearbyTitle.type ? prevTab : nearbyTitle.type));
      }
    }
    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener('scroll', handleContainerScroll);
    }
    return () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.removeEventListener('scroll', handleContainerScroll);
      }
    };
  }, []);

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

  return {
    tab,
    changeTab,
    ingredientsTypes,
    IngredientsTitles,
    filteredIngredients,
    scrollContainerRef,
    titlesRef,
  };
}
