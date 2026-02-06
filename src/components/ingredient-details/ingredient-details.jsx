import Modal from '@components/modal/modal.jsx';

import styles from './ingredient-details.module.css';
export default function IngredientDetails({ ingredient, onClose }) {
  return (
    <Modal title="Детали ингредиента" onClose={onClose}>
      <div className={styles.container}>
        <img
          className={`${styles.image} mb-4`}
          src={ingredient.image}
          alt="ингредиент"
        />
        <p className="text text_type_main-medium mb-8">
          Биокотлета из марсианской Магнолии
        </p>
        <ul
          className={`${styles.ingredient_details} text text_type_main-default text_color_inactive`}
        >
          <li>
            <span>Калории,ккал</span>
            <span>{ingredient.calories}</span>
          </li>
          <li>
            <span>Белки, г</span>
            <span>{ingredient.proteins}</span>
          </li>
          <li>
            <span>Жиры, г</span>
            <span>{ingredient.fat}</span>
          </li>
          <li>
            <span>Углеводы, г</span>
            <span>{ingredient.carbohydrates}</span>
          </li>
        </ul>
      </div>
    </Modal>
  );
}
