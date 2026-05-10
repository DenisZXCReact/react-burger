import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import Text from '@/ui/text/text.tsx';
import OrderIngredientPreview from '@components/feed/order-ingredient-preview/order-ingredient-preview.tsx';
import { useOrder } from '@hooks/useOrder.ts';

import type { ReactElement } from 'react';

import type { TFeedOrder } from '@/types/types.ts';

import styles from './order-list-item.module.css';

export default function OrderListItem({
  ingredients,
  number,
  name,
  onClick,
  showDone = false,
  status,
  ...order
}: TFeedOrder & { onClick: () => void; showDone?: boolean }): ReactElement {
  const { totalPrice, formattedDate } = useOrder({
    ingredients,
    number,
    name,
    status,
    ...order,
  });

  const maxIngredientsView = 6;
  const isDone = status === 'done';
  const doneText = isDone ? 'Выполнен' : 'Готовится';
  return (
    <article className={styles.item} onClick={onClick}>
      <div className={styles.header}>
        <Text isDigits>#{number}</Text>
        <Text isInActive>{formattedDate}</Text>
      </div>
      <h3 className="text text_type_main-medium">{name}</h3>
      {showDone && <Text className={isDone ? 'success-color' : ''}>{doneText}</Text>}
      <div className={styles.footer}>
        <div className={styles.ingredients}>
          {ingredients.map((ingredient, index) => {
            if (index < maxIngredientsView - 1) {
              return (
                <OrderIngredientPreview
                  key={index}
                  ingredientId={ingredient}
                  className={styles.preview}
                />
              );
            } else if (index === maxIngredientsView - 1) {
              return (
                <OrderIngredientPreview
                  key={index}
                  ingredientId={ingredient}
                  more={
                    ingredients.length - maxIngredientsView != 0 &&
                    ingredients.length - maxIngredientsView
                  }
                  className={styles.preview}
                />
              );
            }
          })}
        </div>
        <div className={styles.price}>
          <span className="text text_type_digits-default">{totalPrice}</span>
          <CurrencyIcon type={'primary'} />
        </div>
      </div>
    </article>
  );
}
