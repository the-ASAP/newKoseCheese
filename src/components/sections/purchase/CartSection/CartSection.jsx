// @ts-nocheck
import React from 'react';

import { Purchase } from 'components/common/Purchase/Purchase';
import { TotalPrice } from 'components/common/TotalPrice/TotalPrice';
import { useSelector } from 'react-redux';
import { cartItemsSelector, totalPriceSelector } from 'redux/slices/cart';
import s from './CartSection.module.scss';

const isNumber = (value) => typeof value === 'number';

export const CartSection = ({ cost }) => {
  const itemsInCart = useSelector(cartItemsSelector);
  const totalPrice = useSelector(totalPriceSelector);
  return (
    <>
      <div className={s.container}>
        <div className={s.cart}> 
          <div className={s.field}>
            {cost && cost !== 'Адреса не существует' && (
              <>
                {isNumber(cost) && <span className={s.info}>Доставка:</span>}
                <span className={s.value}> 
                  {cost}
                  {isNumber(cost) && ' руб.'}
                </span>
              </>
            )}
          </div>
          <TotalPrice value={isNumber(cost) ? totalPrice + cost : totalPrice} />
          <div className={s.header}>
            <h2>Корзина</h2>
          </div>
          <div className={s.container__purchase}>
            {itemsInCart.map((item, i) => (
              <Purchase inOrder key={i} params={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
