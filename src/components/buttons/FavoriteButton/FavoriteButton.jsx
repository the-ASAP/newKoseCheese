import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { FavoriteIcon } from 'components/SVG/Icons';
import { useDispatch, useSelector } from 'react-redux';
import { favoriteChangeModalState, menuChangeModalState } from 'redux/slices/modals';
import { favoriteItemsSelector } from 'redux/slices/favorite';

import s from './FavoriteButton.module.scss';

export const FavoriteButton = ({ router, headerColors, isPromoPage }) => {
  const dispatch = useDispatch();

  const favoriteModalHandler = () => {
    dispatch(favoriteChangeModalState(true));
    dispatch(menuChangeModalState(false));
  };
  const itemsInCart = useSelector(favoriteItemsSelector);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const res = itemsInCart.reduce((acc, item) => (acc += Number(item.quantity)), 0);
    setCount(res);
  }, [itemsInCart]);

  return (
    <button
      type="button"
      className={clsx(s.button, s.favorite, isPromoPage && !headerColors && s.button_accent)}
      onClick={favoriteModalHandler}
    >
      <FavoriteIcon />
      {count > 0 && <div className={s.cart__count}>{count}</div>}
    </button>
  );
};
