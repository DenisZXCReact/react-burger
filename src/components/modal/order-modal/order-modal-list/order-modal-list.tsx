import { clsx } from 'clsx';

import OrderModalListItem from '@components/modal/order-modal/order-modal-list-item/order-modal-item.tsx';
import ScrollableContainer from '@components/scrollable-container/scrollable-container.tsx';

import type { ReactNode } from 'react';

import styles from './order-modal-list.module.css';

type TOrderModalListProps = {
  ingredientIds: string[];
};

export default function OrderModalList({
  ingredientIds,
}: TOrderModalListProps): ReactNode {
  const uniqueIngredients = ingredientIds.reduce<Record<string, number>>((acc, id) => {
    acc[id] = (acc[id] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <ScrollableContainer className={clsx('mb-10', styles.list)}>
      {Object.entries(uniqueIngredients).map(([id, count]) => (
        <OrderModalListItem key={id} ingredientId={id} count={count} />
      ))}
    </ScrollableContainer>
  );
}
