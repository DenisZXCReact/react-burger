import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { type ReactNode, Suspense, useEffect } from 'react';
import { Await, Outlet, useLoaderData, useNavigate } from 'react-router-dom';

import Text from '@/ui/text/text.tsx';
import OrderListItem from '@components/feed/order-list-item/order-list-item.tsx';
import ScrollableContainer from '@components/scrollable-container/scrollable-container.tsx';
import { useAppDispatch } from '@hooks/useAppDispatch.ts';
import { useAppSelector } from '@hooks/useAppSelector.ts';
import { setOrderModal } from '@services/order-modal/order-modal-slice.ts';
import {
  connect,
  disconnect,
  getProfileOrdersData,
} from '@services/profile-socket/profile-socket-slice.ts';
import { profileOrdersSocketUrl } from '@utils/constants.ts';

import styles from './profile-order.module.css';

export default function ProfileOrder(): ReactNode {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const profileData = useAppSelector(getProfileOrdersData);
  const { loadIngredients } = useLoaderData();

  useEffect(() => {
    const token = localStorage.getItem('accessToken')?.replace('Bearer ', '') ?? '';
    dispatch(connect(`${profileOrdersSocketUrl}?token=${token}`));
    return (): void => {
      dispatch(disconnect());
    };
  }, []);
  const emptyList = profileData?.orders.length === 0;
  return (
    <div className={styles.orders}>
      <Suspense>
        <Await resolve={loadIngredients}>
          {!profileData ? (
            <Preloader />
          ) : (
            <ScrollableContainer
              className={clsx(styles.list, emptyList && styles.empty)}
            >
              {emptyList ? (
                <Text size="large">Заказов нет</Text>
              ) : (
                profileData?.orders
                  .map((order) => (
                    <OrderListItem
                      key={order._id}
                      {...order}
                      showDone
                      onClick={() => {
                        dispatch(setOrderModal(order));
                        navigate(`/profile/orders/${order._id}`);
                      }}
                    />
                  ))
                  .reverse()
              )}
            </ScrollableContainer>
          )}

          <Outlet />
        </Await>
      </Suspense>
    </div>
  );
}
