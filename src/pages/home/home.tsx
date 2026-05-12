import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { type ReactNode, Suspense } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Await, Outlet, useLoaderData } from 'react-router-dom';

import { BurgerConstructor } from '@components/burger/constructor/burger-constructor/burger-constructor.tsx';
import { BurgerIngredients } from '@components/burger/ingredients/burger-ingredients/burger-ingredients.tsx';

import styles from './home.module.css';

export default function Home(): ReactNode {
  const { loadIngredients } = useLoaderData();

  return (
    <DndProvider backend={HTML5Backend}>
      <Suspense fallback={<Preloader />}>
        <Await resolve={loadIngredients}>
          <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
            Соберите бургер
          </h1>

          <main className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </main>
          <Outlet />
        </Await>
      </Suspense>
    </DndProvider>
  );
}
