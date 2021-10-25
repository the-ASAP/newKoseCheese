import React from "react";
import { FavoriteIcon, PurchaseIcon } from "components/SVG/Icons";
import { useDispatch, useSelector } from "react-redux";
import { cartChangeModalState, favoriteChangeModalState, popUpChangeModalState } from "redux/slices/modals";
import { cartItemsSelector, reqAddToCart } from "redux/slices/cart";
import { addToFavorite } from "redux/slices/favorite";
import clsx from "clsx";
import s from "./ControlButtons.module.scss";

export const ControlButtons = ({ productProps }) => {
  const dispatch = useDispatch();
  const itemsInCart = useSelector(cartItemsSelector);

  const isItemInCart = itemsInCart.find(product => product.id === productProps.id);


  const favoriteModalHandler = () => {
    dispatch(addToFavorite(productProps));
    dispatch(favoriteChangeModalState(true));
  };



  const cartHandler = () => {
    if (productProps.status && !isItemInCart) {
      dispatch(reqAddToCart(productProps));
    } else if (!productProps.status) {
      dispatch(popUpChangeModalState({
        visible: true,
        text: "Товара временно нет в наличии"
      }));
    } else if (isItemInCart) {
      dispatch(popUpChangeModalState({
        visible: true,
        text: "Товар уже в корзине"
      }));
    }
  };

  return (
    <div className={s.container}>
      <button type="button" className={clsx(s.button, s.favorite)} onClick={favoriteModalHandler}>
        <FavoriteIcon/>
      </button>
      <button type="button" className={clsx(s.button, s.cart)} onClick={cartHandler}>
        <PurchaseIcon/>
      </button>
    </div>
  );
};

