import { Preloader } from '@krgaa/react-developer-burger-ui-components';

import { AppHeader } from '@components/app-header/app-header.jsx';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor.jsx';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients.jsx';
import useBurger from '@hooks/useBurger.js';
// import { ingredients } from '@utils/ingredients';
import useFetch from '@hooks/useFetch.js';
import { INGREDIENTS_API } from '@utils/constants.js';

import styles from './app.module.css';
export const App = () => {
  const { loading, result, error } = useFetch(INGREDIENTS_API);
  const ingredients = result || null;

  const {
    burgerBun,
    burgerFilling,
    burgerPrice,
    addIngredient,
    getIngredientCount,
    deleteIngredient,
  } = useBurger(ingredients);

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
            <BurgerIngredients
              ingredients={ingredients}
              addBurgerIngredient={addIngredient}
              getIngredientCount={getIngredientCount}
            />
            <BurgerConstructor
              ingredients={ingredients}
              burgerIngredients={burgerFilling}
              burgerPrice={burgerPrice}
              burgerBun={burgerBun}
              deleteIngredient={deleteIngredient}
            />
          </>
        )}
      </main>
    </div>
  );
};
