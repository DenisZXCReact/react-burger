import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadIngredients } from '@/services/ingredients/ingredients-action.js';
import {
  getIngredientsError,
  getIngredientsLoading,
} from '@/services/ingredients/ingredients-slice.js';
import { AppHeader } from '@components/app-header/app-header.jsx';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor.jsx';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients.jsx';

import styles from './app.module.css';
export const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadIngredients());
  }, []);
  const loading = useSelector(getIngredientsLoading);
  const error = useSelector(getIngredientsError);

  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>

      <main className={`${styles.main} pl-5 pr-5`}>
        {loading || error ? (
          <Preloader />
        ) : (
          <>
            <BurgerIngredients />
            <BurgerConstructor />
          </>
        )}
      </main>
    </div>
  );
};
