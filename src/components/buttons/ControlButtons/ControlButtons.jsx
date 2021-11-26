// @ts-nocheck
import React, { useEffect, useState, useRef } from 'react';
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
import { addFavorite } from 'functions';
import clsx from 'clsx';
import s from './ControlButtons.module.scss';

export const ControlButtons = ({ productProps }) => {
  const dispatch = useDispatch();

  const itemsInCart = useSelector(cartItemsSelector);
  const favorite = useSelector(favoriteItemsSelector);

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

  const { id } = productProps;
  const [favClick, setFavClick] = useState(false);
  const [cartClick, setCartClick] = useState(false);

  useEffect(() => {
    favorite.some((item) => item.id === id) ? setFavClick(true) : setFavClick(false);
  }, [favorite]);

  useEffect(() => {
    itemsInCart.some((item) => item.id === id) ? setCartClick(true) : setCartClick(false);
  }, [itemsInCart]);

  return (
    <div className={s.container}>
      <button
        type="button"
        className={clsx(s.button, favClick ? s.favClicked : '')}
        onClick={favoriteModalHandler}
      >
        <FavoriteIcon />
      </button>
      <button
        type="button"
        className={clsx(s.button, cartClick ? s.cartClicked : '')}
        onClick={cartHandler}
      >
        <PurchaseIcon />
      </button>
    </div>
  );
};
