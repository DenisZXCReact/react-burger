import {
  type RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useAppSelector } from '@hooks/useAppSelector.ts';
import { getIngredients } from '@services/ingredients/ingredients-slice.ts';

import type { TIngredient, TIngredientType } from '@/types/types.ts';

export type TChangeTab = (tab: TIngredientType) => void;

export type TIngredientsTabTypes = { id: number; type: TIngredientType }[];
export type TIngredientsTitles = Record<TIngredientType, string>;
export type TIngredientsTitlesRef = RefObject<Record<string, HTMLElement>>;
type TUseIngredientsReturn = {
  tab: TIngredientType;
  changeTab: TChangeTab;
  ingredientsTabTypes: TIngredientsTabTypes;
  IngredientsTitles: TIngredientsTitles;
  filteredIngredients: Record<TIngredientType, TIngredient[]>;
  scrollContainerRef: RefObject<HTMLDivElement | null>;
  titlesRef: TIngredientsTitlesRef;
};

export default function useIngredients(): TUseIngredientsReturn {
  const ingredients = useAppSelector(getIngredients);
  const [tab, setTab] = useState<TIngredientType>('bun');
  const scrollContainerRef = useRef<null | HTMLDivElement>(null);
  const titlesRef = useRef<Record<string, HTMLElement>>({});
  const ingredientsTabTypes = useMemo<TIngredientsTabTypes>(
    () => [
      { id: 1, type: 'bun' },
      { id: 2, type: 'sauce' },
      { id: 3, type: 'main' },
    ],
    []
  );
  useEffect(() => {
    function handleContainerScroll(): void {
      if (!scrollContainerRef.current) return;
      const titles = Object.values(titlesRef.current);
      const scrollContainerTop = scrollContainerRef.current.getBoundingClientRect().top;
      if (titles.length > 0) {
        const nearbyTitle = titles.reduce(
          (closest: null | { offset: number; type: TIngredientType }, title, index) => {
            const titleRect = title.getBoundingClientRect();
            const titleTopOffset = Math.abs(titleRect.top - scrollContainerTop);

            if (!closest || titleTopOffset < closest.offset) {
              return {
                offset: titleTopOffset,
                type: ingredientsTabTypes[index].type,
              };
            }
            return closest;
          },
          null
        );
        setTab((prevTab) => {
          return prevTab === nearbyTitle!.type ? prevTab : nearbyTitle!.type;
        });
      }
    }
    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener('scroll', handleContainerScroll);
    }
    return (): void => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.removeEventListener('scroll', handleContainerScroll);
      }
    };
  }, []);

  const IngredientsTitles = useMemo<TIngredientsTitles>(
    () => ({
      bun: 'Булки',
      sauce: 'Соусы',
      main: 'Начинка',
    }),
    []
  );
  const changeTab = useCallback<TChangeTab>((newTab) => {
    setTab(newTab);
    const ingredientsContainer: HTMLElement | null =
      document.querySelector('.group_container');
    const groupBlock: HTMLElement | null = document.querySelector(`#group-${newTab}`);

    if (!groupBlock || !ingredientsContainer) return;

    ingredientsContainer!.scrollTo({
      top: groupBlock.offsetTop - ingredientsContainer.offsetTop,
      behavior: 'smooth',
    });
  }, []);
  const filteredIngredients = useMemo(() => {
    console.log(ingredients);
    return {
      bun: ingredients.filter((ingredient) => ingredient.type === 'bun'),
      sauce: ingredients.filter((ingredient) => ingredient.type === 'sauce'),
      main: ingredients.filter((ingredient) => ingredient.type === 'main'),
    };
  }, [ingredients]);

  return {
    tab,
    changeTab,
    ingredientsTabTypes,
    IngredientsTitles,
    filteredIngredients,
    scrollContainerRef,
    titlesRef,
  };
}
