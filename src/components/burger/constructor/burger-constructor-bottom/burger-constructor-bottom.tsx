import { Button, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import React, { type ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import OrderDetails from '@components/order-details/order-details.js';
import { useAppDispatch } from '@hooks/useAppDispatch.ts';
import { useAppSelector } from '@hooks/useAppSelector.ts';
import { getAuthUser } from '@services/auth/auth-slice.ts';
import {
  getBurgerPrice,
  getIngredientsForOrder,
  isBurgerReadyToOrder,
} from '@services/burder-ingredients/burder-ingredients-selectors.ts';
import { resetBurger } from '@services/burder-ingredients/burder-ingredients-slice.ts';
import { createOrder } from '@services/orderDetails/order-details-action.ts';

import styles from './burger-constructor-bottom.module.css';

function BurgerConstructorBottom(): ReactNode {
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const burgerPrice = useAppSelector(getBurgerPrice);
  const { ingredients } = useAppSelector(getIngredientsForOrder);
  const readyToOrder = useAppSelector(isBurgerReadyToOrder);
  const user = useAppSelector(getAuthUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  function isDefinedArray<T>(arr: (T | undefined)[]): arr is T[] {
    return arr.every((item) => item !== undefined);
  }
  function order(): void {
    if (!readyToOrder || !isDefinedArray<string>(ingredients)) return;
    if (!user) {
      navigate('/login', { state: { from: '/' } });
      return;
    }

    dispatch(createOrder(ingredients));
    setShowOrderDetail(true);
  }

  return (
    <div className={`${styles.constructor_footer} pr-4`}>
      <div className={styles.burger_price_box}>
        <span className="text text_type_digits-medium mr-2">{burgerPrice}</span>
        <CurrencyIcon type="primary" className={styles.priceIcon} />
      </div>
      <Button
        disabled={!readyToOrder}
        onClick={order}
        size="large"
        type="primary"
        htmlType="button"
      >
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
