import React, { useEffect } from 'react';
import { FavoriteIcon, PurchaseIcon } from 'components/SVG/Icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  cartChangeModalState,
  favoriteChangeModalState,
  popUpChangeModalState
} from 'redux/slices/modals';
import { cartItemsSelector, reqAddToCart } from 'redux/slices/cart';
import { favoriteItemsSelector } from 'redux/slices/favorite';
import { addToFavorite } from 'redux/slices/favorite';
import clsx from 'clsx';
import s from './ControlButtons.module.scss';

export const ControlButtons = ({ productProps }) => {
  const dispatch = useDispatch();

  const itemsInCart = useSelector(cartItemsSelector);
  const favorite = useSelector(favoriteItemsSelector);

  const isItemInCart = itemsInCart.find((product) => product.id === productProps.id);

  const favoriteModalHandler = () => {
    // console.log(productProps);
    dispatch(addToFavorite(productProps));
    // dispatch(favoriteChangeModalState(true));
  };

  const cartHandler = () => {
    if (productProps.status) {
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

  return (
    <div className={s.container}>
      <button type="button" className={clsx(s.button, s.favorite)} onClick={favoriteModalHandler}>
        <FavoriteIcon />
      </button>
      <button type="button" className={clsx(s.button, s.cart)} onClick={cartHandler}>
        <PurchaseIcon />
      </button>
    </div>
  );
};
