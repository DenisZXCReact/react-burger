import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch } from '@hooks/useAppDispatch.ts';
import { useAppSelector } from '@hooks/useAppSelector.ts';
import { getFeedData } from '@services/feed-socket/feed-socket-slice.ts';
import { getOrder } from '@services/order-modal/order-modal-action.ts';
import {
  getOrderModal,
  getOrderModalError,
  getOrderModalLoading,
  setOrderModal,
} from '@services/order-modal/order-modal-slice.ts';
import { getProfileOrdersData } from '@services/profile-socket/profile-socket-slice.ts';

import type { TFeedOrder } from '@/types/types.ts';

type TReturnUseOrderModal = {
  order: TFeedOrder | null;
  loading: boolean;
  error: string | null;
};

export const useOrderModal = (isProfileOrder = false): TReturnUseOrderModal => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const feedData = useAppSelector(getFeedData);
  const profileData = useAppSelector(getProfileOrdersData);
  const order = useAppSelector(getOrderModal);
  const loading = useAppSelector(getOrderModalLoading);
  const error = useAppSelector(getOrderModalError);

  useEffect(() => {
    if (order || !id) return;

    const feedOrder = feedData?.orders.find((o) => o._id === id);
    const profileOrder = profileData?.orders.find((o) => o._id === id);
    if (feedOrder && !isProfileOrder) {
      dispatch(setOrderModal(feedOrder));
      return;
    } else if (profileOrder && isProfileOrder) {
      dispatch(setOrderModal(profileOrder));
      return;
    }

    dispatch(getOrder(id));
  }, [id]);

  return { order, loading, error };
};
