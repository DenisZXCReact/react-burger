import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { type ReactNode, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Modal from '@components/modal/modal.tsx';
import OrderModal from '@components/modal/order-modal/order-modal.tsx';
import { useAppDispatch } from '@hooks/useAppDispatch.ts';
import { useOrderModal } from '@hooks/useOrderModal.ts';
import { clearOrderModal } from '@services/order-modal/order-modal-slice.ts';

export default function FeedOrderModal(): ReactNode {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { order } = useOrderModal();
  const handleClose = useCallback(() => {
    dispatch(clearOrderModal());
    navigate('/feed');
  }, [dispatch, navigate]);

  if (!order)
    return (
      <Modal onClose={handleClose}>
        <Preloader />
      </Modal>
    );

  return (
    <Modal titleSize="medium" title={`#${order.number}`} onClose={handleClose}>
      <OrderModal order={order} />
    </Modal>
  );
}
