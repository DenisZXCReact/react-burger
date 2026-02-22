import { Button, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import OrderDetails from '@components/order-details/order-details.jsx';
import {
  getBurgerPrice,
  getIngredientsForOrder,
  isBurgerReadyToOrder,
} from '@services/burder-ingredients/burder-ingredients-selectors.js';
import { resetBurger } from '@services/burder-ingredients/burder-ingredients-slice.js';
import { createOrder } from '@services/orderDetails/order-details-action.js';

import styles from './burger-constructor-bottom.module.css';

function BurgerConstructorBottom() {
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const burgerPrice = useSelector(getBurgerPrice);
  const dataForOrder = useSelector(getIngredientsForOrder);
  const readyToOrder = useSelector(isBurgerReadyToOrder);
  const dispatch = useDispatch();

  function order() {
    if (!readyToOrder) return;
    dispatch(createOrder(dataForOrder));
    setShowOrderDetail(true);
  }

  return (
    <div className={`${styles.constructor_footer} pr-4`}>
      <div className={styles.burger_price_box}>
        <span className="text text_type_digits-medium mr-2">{burgerPrice}</span>
        <CurrencyIcon type="primary" className={styles.priceIcon} />
      </div>
      <Button disabled={!readyToOrder} onClick={order} size="large" type="primary">
        Оформить заказ
      </Button>
      {showOrderDetail && (
        <OrderDetails
          onClose={() => {
            dispatch(resetBurger());
            setShowOrderDetail(false);
          }}
        />
      )}
    </div>
  );
}
export default React.memo(BurgerConstructorBottom);
