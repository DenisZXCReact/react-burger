import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import OrderListItem from '@components/feed/order-list-item/order-list-item.tsx';
import ScrollableContainer from '@components/scrollable-container/scrollable-container.tsx';
import { useAppDispatch } from '@hooks/useAppDispatch.ts';
import { getFeedData } from '@services/feed-socket/feed-socket-slice.ts';
import { setOrderModal } from '@services/order-modal/order-modal-slice.ts';

import type { ReactNode } from 'react';

import styles from './order-list.module.css';

export default function OrderList(): ReactNode {
  const feedData = useSelector(getFeedData)!;
  const orders = feedData.orders;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <ScrollableContainer className={styles.list}>
      {orders.map((order) => (
        <OrderListItem
          key={order._id}
          {...order}
          onClick={() => {
            dispatch(setOrderModal(order));
            navigate(`/feed/${order._id}`);
          }}
        />
      ))}
    </ScrollableContainer>
  );
}
