import React, { useState, useEffect } from 'react';
import { CartIcon } from 'components/SVG/Icons';
import clsx from 'clsx';
import { cartChangeModalState, menuChangeModalState, menuModalSelector } from 'redux/slices/modals';
import { useDispatch, useSelector } from 'react-redux';
import { cartItemsSelector } from 'redux/slices/cart';

import s from './CartButton.module.scss';

export const CartButton = ({ router, headerColors, isPromoPage }) => {
  const dispatch = useDispatch();
  const cartModalHandler = () => {
    dispatch(cartChangeModalState(true));
    dispatch(menuChangeModalState(false));
  };
  const menuModalValue = useSelector(menuModalSelector);
  const itemsInCart = useSelector(cartItemsSelector);

  const [count, setCount] = useState(0);

  useEffect(() => {
    const res = itemsInCart.reduce((acc, item) => (acc += Number(item.quantity)), 0);
    setCount(res);
  }, [itemsInCart]);

  return (
    <button
      type="button"
      className={clsx(s.button, s.cart, isPromoPage && !headerColors && s.button_accent)}
      onClick={cartModalHandler}
    >
      <CartIcon />
      {count > 0 && <div className={s.cart__count}>{count}</div>}
    </button>
  );
};
