import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { type ReactNode, Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Await, Outlet, useLoaderData } from 'react-router-dom';

import FeedStats from '@components/feed/feed-stats/feed-stats.tsx';
import OrderList from '@components/feed/order-list/order-list.tsx';
import { useAppDispatch } from '@hooks/useAppDispatch.ts';
import {
  connect,
  disconnect,
  getFeedData,
} from '@services/feed-socket/feed-socket-slice.ts';

import styles from './feed.module.css';
export default function Feed(): ReactNode {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(connect());
    return (): void => {
      dispatch(disconnect());
    };
  }, []);
  const { loadIngredients } = useLoaderData();
  const feedData = useSelector(getFeedData);

  return (
    <Suspense fallback={<Preloader />}>
      <Await resolve={loadIngredients}>
        {!feedData ? (
          <Preloader />
        ) : (
          <>
            <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
              Лента заказов
            </h1>
            <div className={styles.feed}>
              <OrderList />
              <FeedStats />
            </div>
          </>
        )}

        <Outlet />
      </Await>
    </Suspense>
  );
}
