// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { FavoriteIcon, PurchaseIcon } from 'components/SVG/Icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  cartChangeModalState,
  favoriteChangeModalState,
  popUpChangeModalState
} from 'redux/slices/modals';
import { cartItemsSelector, reqAddToCart } from 'redux/slices/cart';
import { addToFavorite } from 'redux/slices/favorite';
import { addFavorite } from 'functions';
import clsx from 'clsx';
import s from './ControlButtons.module.scss';

export const ControlButtons = ({ productProps }) => {
  const dispatch = useDispatch();

  const itemsInCart = useSelector(cartItemsSelector);
  // const favorite = useSelector(favoriteItemsSelector);
  // const isItemInCart = itemsInCart.find((product) => product.id === productProps.id);

  const favoriteModalHandler = () => {
    dispatch(addToFavorite(productProps));
    addFavorite(productProps);
    // dispatch(favoriteChangeModalState(true));
  };

  const cartHandler = () => {
    if (productProps.status) {
      // @ts-ignore
      dispatch(reqAddToCart(productProps));
    } else if (!productProps.status) {
      dispatch(
        popUpChangeModalState({
          visible: true,
          text: 'Товара временно нет в наличии'
        })
      );
    }
  };

  const favClassNames = `${s.button} ${s.favorite}`;
  const purClassNames = `${s.button} ${s.cart}`;

  return (
    <div className={s.container}>
      {/* <button type="button" className={clsx(s.button, s.favorite)} onClick={favoriteModalHandler}> */}
      <button type="button" className={favClassNames} onClick={favoriteModalHandler}>
        <FavoriteIcon />
      </button>
      {/* <button type="button" className={clsx(s.button, s.cart)} onClick={cartHandler}> */}
      <button type="button" className={purClassNames} onClick={cartHandler}>
        <PurchaseIcon />
      </button>
    </div>
  );
};
