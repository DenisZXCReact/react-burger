import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';

import Modal from '@components/modal/modal.jsx';
import orderIcon from '@images/orderIcon.svg';
import {
  getOrderError,
  getOrderInfo,
  getOrderLoading,
} from '@services/orderDetails/order-details-slice.js';

import styles from './order-details.module.css';
export default function OrderDetails({ onClose }) {
  const orderLoading = useSelector(getOrderLoading);
  const orderError = useSelector(getOrderError);
  const orderDetails = useSelector(getOrderInfo);
  return (
    <Modal onClose={onClose} disableClosing={orderLoading || orderError}>
      {orderLoading || orderError ? (
        <Preloader />
      ) : (
        <div className={styles.container}>
          <h3 className={`${styles.title} mb-8 mt-9 text text_type_digits-large`}>
            {orderDetails.order.number}
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
