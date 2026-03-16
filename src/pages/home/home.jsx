import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { Suspense } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Await, Outlet, useLoaderData } from 'react-router-dom';

import { BurgerConstructor } from '@components/burger/constructor/burger-constructor/burger-constructor.jsx';
import { BurgerIngredients } from '@components/burger/ingredients/burger-ingredients/burger-ingredients.jsx';
import IngredientPreview from '@components/burger/ingredients/ingredient-preview/ingredient-preview.jsx';
import { useIngredientDetails } from '@hooks/useIngredientDetails.js';

import styles from './home.module.css';

export default function Home() {
  const { loadIngredients } = useLoaderData();
  const { isDirectLink, backgroundLocation } = useIngredientDetails();

  return (
    <DndProvider backend={HTML5Backend}>
      <Suspense fallback={<Preloader />}>
        <Await resolve={loadIngredients}>
          {isDirectLink ? (
            <div className={`mt-30 ${styles.direct}`}>
              <h1 className="text text_type_main-large">Детали ингредиента</h1>
              <Outlet />
            </div>
          ) : (
            <>
              <h1
                className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
              >
                Соберите бургер
              </h1>

              <main className={`${styles.main} pl-5 pr-5`}>
                <BurgerIngredients />
                <BurgerConstructor />
              </main>
              {backgroundLocation && <IngredientPreview />}
            </>
          )}
        </Await>
      </Suspense>
    </DndProvider>
  );
}
