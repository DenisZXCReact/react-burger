import { useAppSelector } from '@hooks/useAppSelector.ts';
import { getFeedData } from '@services/feed-socket/feed-socket-slice.ts';

import type { ReactNode } from 'react';

import styles from './live-orders-stats.module.css';
export default function LiveOrdersStats(): ReactNode {
  const feedData = useAppSelector(getFeedData);
  const readyOrders = feedData!.orders.filter((order) => order.status === 'done');
  const inWorkOrder = feedData!.orders.filter((order) => order.status !== 'done');
  return (
    <div className={styles.stats}>
      <div className={styles.readyBlock}>
        <h3 className="text text_type_main-medium mb-6">Готовы:</h3>
        <div className={styles.listsBox}>
          <ul className={styles.list}>
            {readyOrders.map(
              (item, i) =>
                i < 5 && (
                  <li
                    key={item._id}
                    className="text text_type_digits-default mb-2 success-color"
                  >
                    {item.number}
                  </li>
                )
            )}
          </ul>
          <ul className={styles.list}>
            {readyOrders.map(
              (item, i) =>
                i >= 5 &&
                i < 10 && (
                  <li
                    key={item._id}
                    className="text text_type_digits-default mb-2 success-color"
                  >
                    {item.number}
                  </li>
                )
            )}
          </ul>
        </div>
      </div>

      <div className={styles.workBlock}>
        <h3 className="text text_type_main-medium mb-6">В работе:</h3>
        <div className={styles.listsBox}>
          <ul className={styles.list}>
            {inWorkOrder.map(
              (item, i) =>
                i < 5 && (
                  <li key={item._id} className="text text_type_digits-default mb-2">
                    {item.number}
                  </li>
                )
            )}
          </ul>
          <ul className={styles.list}>
            {inWorkOrder.map(
              (item, i) =>
                i >= 5 &&
                i < 10 && (
                  <li key={item._id} className="text text_type_digits-default mb-2">
                    {item.number}
                  </li>
                )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
