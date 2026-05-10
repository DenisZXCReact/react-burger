import { clsx } from 'clsx';
import { useSelector } from 'react-redux';

import LiveOrdersStats from '@components/feed/live-orders-stats/live-orders-stats.tsx';
import { getFeedData } from '@services/feed-socket/feed-socket-slice.ts';

import type { ReactNode } from 'react';

import styles from './feed-stats.module.css';
export default function FeedStats(): ReactNode {
  const feedData = useSelector(getFeedData)!;
  const addSpaceNumber = (number: number): string => {
    return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };
  return (
    <div className={styles.feedStats}>
      <LiveOrdersStats />
      <div>
        <h3 className="text text_type_main-medium">Выполнено за все время:</h3>
        <h2 className={clsx(styles.all, 'text text_type_digits-large')}>
          {addSpaceNumber(feedData.total)}
        </h2>
      </div>
      <div>
        <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
        <h2 className={clsx(styles.all, 'text text_type_digits-large')}>
          {addSpaceNumber(feedData.totalToday)}
        </h2>
      </div>
    </div>
  );
}
