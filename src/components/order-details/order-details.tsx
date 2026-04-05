import { Preloader } from '@krgaa/react-developer-burger-ui-components';

import Modal from '@components/modal/modal.tsx';
import { useAppSelector } from '@hooks/useAppSelector.js';
import orderIcon from '@images/orderIcon.svg';
import {
  getOrderError,
  getOrderInfo,
  getOrderLoading,
} from '@services/orderDetails/order-details-slice.ts';

import type { ReactNode } from 'react';

import styles from './order-details.module.css';
export default function OrderDetails({ onClose }: { onClose: () => void }): ReactNode {
  const orderLoading = useAppSelector(getOrderLoading);
  const orderError = useAppSelector(getOrderError);
  const orderDetails = useAppSelector(getOrderInfo);
  return (
    <Modal onClose={onClose} disableClosing={orderLoading || !!orderError}>
      {orderLoading || orderError ? (
        <Preloader />
      ) : (
        <div className={styles.container}>
          <h3 className={`${styles.title} mb-8 mt-9 text text_type_digits-large`}>
            {orderDetails && orderDetails.order.number}
          </h3>
          <p className={`${styles.id_number} text text_type_main-medium`}>
            идентификатор заказа
          </p>
          <div className={styles.order_icon}>
            <img src={orderIcon} alt="svg" />
          </div>
          <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
          <p className="text text_type_main-default text_color_inactive">
            Дождитесь готовности на орбитальной станции
          </p>
        </div>
      )}
    </Modal>
  );
}
