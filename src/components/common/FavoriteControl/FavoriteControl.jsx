import React from "react";

import { RemoveButton } from "components/buttons/RemoveButton/RemoveButton";
import s from "./FavoriteControl.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, cartItemsSelector, reqAddToCart } from "redux/slices/cart";
import { cartChangeModalState, closeAllModals } from "redux/slices/modals";
import { removeFromFavorite } from "redux/slices/favorite";

export const FavoriteControl = ({ product }) => {
  const dispatch = useDispatch();

  const productSelector = useSelector(cartItemsSelector).find(item => item.id === product.id);

  const isItemInCart = productSelector?.id === product.id;

  const addToCartHandler = () => {
    if (product.status && !isItemInCart) {
      dispatch(reqAddToCart({ ...product, quantity: 1 }));
      dispatch(closeAllModals());
      dispatch(cartChangeModalState(true));
    } else if (!product.status) {
      alert("Товара временно нет в наличии");
    } else if (isItemInCart) {
      alert("Товара уже в корзине");
    }
  };

  const removeFromFavoriteHandler = () => {
    dispatch(removeFromFavorite(product));
  };

  return (
    <div className={s.container}>
      <button type='button' className={s.add} onClick={addToCartHandler}>в корзину</button>
      <RemoveButton small clickHandler={removeFromFavoriteHandler}/>
    </div>
  );
};

