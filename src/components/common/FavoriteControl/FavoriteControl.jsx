import React, { useState } from 'react';

import { RemoveButton } from 'components/buttons/RemoveButton/RemoveButton';
import s from './FavoriteControl.module.scss';
import clsx from 'clsx';
import { MinusIcon, PlusIcon } from 'components/SVG/Icons';
import { useDispatch, useSelector } from 'react-redux';
import { cartItemsSelector, reqAddToCart } from 'redux/slices/cart';
import { cartChangeModalState, closeAllModals } from 'redux/slices/modals';
import { removeFromFavorite } from 'redux/slices/favorite';
import { removeFavorite } from 'functions';
import { popUpChangeModalState } from 'redux/slices/modals';

export const FavoriteControl = ({ product }) => {
  const dispatch = useDispatch();

  const productSelector = useSelector(cartItemsSelector).find((item) => item.id === product.id);

  const isItemInCart = productSelector?.id === product.id;

  const [quantity, setQuantity] = useState(1);
  const addToCartHandler = () => {
    if (product.status && !isItemInCart) {
      // @ts-ignore
      dispatch(reqAddToCart({ ...product, quantity }));
      // dispatch(closeAllModals());
      // dispatch(cartChangeModalState(true));
    } else if (!product.status) {
      dispatch(
        popUpChangeModalState({
          visible: true,
          text: 'Товара временно нет в наличии'
        })
      );
    } else if (isItemInCart) {
      dispatch(
        popUpChangeModalState({
          visible: true,
          text: 'Товар уже в корзине'
        })
      );
    }
  };

  const removeFromFavoriteHandler = () => {
    dispatch(removeFromFavorite(product));
    removeFavorite(product);
  };

  const decHandlerInCart = () => {
    if (Number(quantity) > 1) {
      setQuantity((prev) => --prev);
    } else {
      removeFavorite(product);
      dispatch(removeFromFavorite(product));
    }
  };

  return (
    <div className={s.container}>
      <div className={s.info}>
        <div className={s.counter}>
          <button type="button" className={clsx(s.change, s.minus)} onClick={decHandlerInCart}>
            <MinusIcon />
          </button>
          <span className={s.count}>{quantity}</span>
          <button
            type="button"
            className={clsx(s.change, s.plus)}
            onClick={() => setQuantity((prev) => ++prev)}
          >
            <PlusIcon />
          </button>
        </div>
        <RemoveButton small clickHandler={removeFromFavoriteHandler} />
      </div>

      <button type="button" className={s.add} onClick={addToCartHandler}>
        в корзину
      </button>
    </div>
  );
};
