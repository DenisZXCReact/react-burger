import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import Text from '@/ui/text/text.tsx';
import OrderIngredientPreview from '@components/feed/order-ingredient-preview/order-ingredient-preview.tsx';
import { useIngredientData } from '@hooks/useIngredientData.ts';

import type { ReactNode } from 'react';

import styles from './order-modal-item.module.css';

type TOrderModalItemProps = {
  ingredientId: string;
  count: number;
};

export default function OrderModalListItem({
  ingredientId,
  count,
}: TOrderModalItemProps): ReactNode {
  const { price, name } = useIngredientData(ingredientId);

  return (
    <div className={styles.item}>
      <div className={styles.ingredient}>
        <OrderIngredientPreview ingredientId={ingredientId} />
        <Text>{name}</Text>
      </div>
      <div className={styles.price}>
        <Text isDigits={true}>
          {count} x {price}
        </Text>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
}
