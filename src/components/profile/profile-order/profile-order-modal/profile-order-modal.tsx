import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { type ReactNode, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Modal from '@components/modal/modal.tsx';
import OrderModal from '@components/modal/order-modal/order-modal.tsx';
import { useAppDispatch } from '@hooks/useAppDispatch.ts';
import { useOrderModal } from '@hooks/useOrderModal.ts';
import { clearOrderModal } from '@services/order-modal/order-modal-slice.ts';

export default function ProfileOrderModal(): ReactNode {
  const dispatch = useAppDispatch();
  const { order } = useOrderModal(true);
  const navigate = useNavigate();
  const closeFeedOrderModal = useCallback(() => {
    navigate('/profile/orders');
    dispatch(clearOrderModal());
  }, []);
  if (!order)
    return (
      <Modal onClose={closeFeedOrderModal}>
        <Preloader />
      </Modal>
    );
  return (
    <Modal titleSize="medium" title={`#${order.number}`} onClose={closeFeedOrderModal}>
      <OrderModal order={order} />
    </Modal>
  );
}
