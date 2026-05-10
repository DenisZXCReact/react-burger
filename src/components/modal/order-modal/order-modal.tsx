import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';

import OrderModalList from '@components/modal/order-modal/order-modal-list/order-modal-list.tsx';
import { useOrder } from '@hooks/useOrder.ts';

import type { ReactNode } from 'react';

import type { TFeedOrder } from '@/types/types.ts';

import styles from './order-modal.module.css';

type TOrderModalProps = {
  order: TFeedOrder;
};

export default function OrderModal({ order }: TOrderModalProps): ReactNode {
  const { totalPrice, formattedDate } = useOrder(order);
  const isDone = order.status === 'done';
  const doneText = isDone ? 'Выполнен' : 'Готовится';
  return (
    <div>
      <div className={styles.header}>
        <h3 className="text text_type_main-medium mt-10 mb-2">{order.name}</h3>
        <span className={clsx(isDone && 'success-color', 'text text_type_main-default')}>
          {doneText}
        </span>
      </div>
      <h4 className="text text_type_main-medium mb-6">Состав:</h4>
      <OrderModalList ingredientIds={order.ingredients} />
      <div className={styles.footer}>
        <span className="text text_type_main-default text_color_inactive">
          {formattedDate}
        </span>
        <div className={styles.price}>
          <span className="text text_type_digits-default">{totalPrice}</span>
          <CurrencyIcon type={'primary'} />
        </div>
      </div>
    </div>
  );
}
