// @ts-nocheck
import React, { useEffect, useState, useRef } from 'react';
import { FavoriteIcon, ProductsIcon, PurchaseIcon } from 'components/SVG/Icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  popUpChangeModalState
} from 'redux/slices/modals';
import { cartItemsSelector, reqAddToCart, reqIncProductCount} from 'redux/slices/cart';
import { favoriteItemsSelector } from 'redux/slices/favorite';
import { addToFavorite, removeFromFavorite } from 'redux/slices/favorite';
import { addFavorite, removeFavorite } from 'functions';
import clsx from 'clsx';
import s from './ControlButtons.module.scss';

export const ControlButtons = ({ productProps }) => {
  const dispatch = useDispatch();

  const itemsInCart = useSelector(cartItemsSelector);
  const favorite = useSelector(favoriteItemsSelector);

  const favoriteModalHandler = () => {
    if(favorite.some(item => item.id === id)) {
      dispatch(removeFromFavorite(productProps));
      removeFavorite(productProps);
    }
    else {
      dispatch(addToFavorite(productProps));
      addFavorite(productProps);
    }
    // dispatch(favoriteChangeModalState(true));
  };

  const cartHandler = () => {
    if(itemsInCart.some(item => item.id === id)) {
      // let deletedProduct = itemsInCart.find(item => item.id === id)
      // dispatch(reqRemoveFromCart(deletedProduct))
      let incProduct = itemsInCart.find(item => item.id === id)
      dispatch(reqIncProductCount({...incProduct, quantity: parseInt(incProduct?.quantity, 10) + 1}))
    }
    else {
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
