import { Button, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import React, { useState } from 'react';

import OrderDetails from '@components/order-details/order-details.jsx';

import styles from './burger-constructor-bottom.module.css';

function BurgerConstructorBottom({ burgerPrice }) {
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  return (
    <div className={`${styles.constructor_footer} pr-4`}>
      <div className={styles.burger_price_box}>
        <span className="text text_type_digits-medium mr-2">{burgerPrice}</span>
        <CurrencyIcon type="primary" className={styles.priceIcon} />
      </div>
      <Button
        onClick={() => {
          setShowOrderDetail(true);
        }}
        size="large"
        type="primary"
      >
        Оформить заказ
      </Button>
      {showOrderDetail && <OrderDetails onClose={() => setShowOrderDetail(false)} />}
    </div>
  );
}
export default React.memo(BurgerConstructorBottom);
