import React from 'react';

import { Purchase } from 'components/common/Purchase/Purchase';
import { TotalPrice } from 'components/common/TotalPrice/TotalPrice';
import { useSelector } from 'react-redux';
import { cartItemsSelector, totalPriceSelector } from 'redux/slices/cart';
import s from './CartSection.module.scss';

const isNubmer = (value) => typeof value === 'number';

export const CartSection = ({ cost }) => {
  const itemsInCart = useSelector(cartItemsSelector);
  const totalPrice = useSelector(totalPriceSelector);
  console.log('итог', cost);
  return (
    <>
      <div className={s.container}>
        <div className={s.cart}>
          <div className={s.header}>
            <h2>Корзина</h2>
          </div>
          {itemsInCart.map((item, i) => (
            <Purchase inOrder key={i} params={item} />
          ))}
        </div>
        <div className={s.footer}>
          <div className={s.fields}>
            <div className={s.field}>
              <span className={s.info}>Цена:</span>
              <span className={s.value}>{totalPrice} руб.</span>
            </div>
            <div className={s.field}>
              {cost && (
                <>
                  {isNubmer(cost) && <span className={s.info}>Доставка:</span>}
                  <span className={s.value}>
                    {cost}
                    {isNubmer(cost) && ' руб.'}
                  </span>
                </>
              )}
            </div>
          </div>
          <TotalPrice value={isNubmer(cost) ? totalPrice + cost : totalPrice} />
        </div>
      </div>
    </>
  );
};
