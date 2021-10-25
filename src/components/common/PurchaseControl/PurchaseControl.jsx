import React from "react";
import clsx from "clsx";
import { DeliveryIcon, FavoriteIcon, MinusIcon, PlusIcon } from "components/SVG/Icons";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  cartChangeModalState,
  favoriteChangeModalState,
  subscribeChangeModalState
} from "redux/slices/modals";
import {
  cartItemsSelector,
  reqAddToCart,
  reqIncProductCount,
  reqDecProductCount,
  reqRemoveFromCart
} from "redux/slices/cart";

import { addToFavorite } from "redux/slices/favorite";
import { RemoveButton } from "../../buttons/RemoveButton/RemoveButton";
import s from "./PurchaseControl.module.scss";

export const PurchaseControl = ({ product, inCart, additionClass }) => {

  const dispatch = useDispatch();


  const productSelector = useSelector(cartItemsSelector).find(item => item.id === product.id);

  const isItemInCart = productSelector?.id === product.id;

  const [quantity, setQuantity] = React.useState(inCart ? parseInt(productSelector?.quantity, 10) : 1);

  const addToFavoriteHandler = () => {
    dispatch(addToFavorite(product));
    dispatch(favoriteChangeModalState(true));
  };

  const subscribeModalHandler = () => {
    dispatch(subscribeChangeModalState(true));
  };

  const removeHandler = () => {
    dispatch(reqRemoveFromCart(product));
  };

  const decHandlerInCart = async () => {
    if (quantity > 1) {
      await dispatch(reqDecProductCount({ ...productSelector, quantity }));
      setQuantity(quantity - 1);
    }
  };

  const incHandlerInCart = async () => {
    if (quantity < product.count) {
      await dispatch(reqIncProductCount({ ...productSelector, quantity }));
      setQuantity(quantity + 1);
    }
  };

  const decHandlerInDetail = () => {
    quantity > 1 && setQuantity(quantity - 1);
  };

  const incHandlerInDetail = () => {
    quantity < product.count && setQuantity(quantity + 1);
  };

  const addToCartHandler = () => {
    if (product.status && !isItemInCart) {
      dispatch(reqAddToCart({ ...product, quantity }));
      dispatch(cartChangeModalState(true));
    } else if (!product.status) {
      alert("Товара временно нет в наличии");
    } else if (isItemInCart) {
      alert("Товара уже в корзине");
    }
  };

  return (
    <>
      <div className={clsx(s.container, s[additionClass])}>
        <div className={s.counter}>
          <button
            type="button"
            className={clsx(s.change, s.minus)}
            onClick={inCart ? decHandlerInCart : decHandlerInDetail}
          >
            <MinusIcon/>
          </button>
          <span className={s.count}>{quantity}</span>
          <button
            type="button"
            className={clsx(s.change, s.plus)}
            onClick={inCart ? incHandlerInCart : incHandlerInDetail}
          >
            <PlusIcon/>
          </button>
        </div>
        {inCart ? (
          <RemoveButton clickHandler={removeHandler}/>
        ) : (
          <>
            <button type="button" className={s.add} onClick={addToCartHandler}>в корзину</button>
            <button type="button" className={s.favorite} onClick={addToFavoriteHandler}>
              <FavoriteIcon/>
            </button>
          </>
        )}
      </div>
      {!inCart &&
      <button type="button" className={s.subscribe} onClick={subscribeModalHandler}><span>Подписаться на доставку</span>
      </button>}
      <div className={s.delivery}>
        <DeliveryIcon/>
        <span className={s.text}>Ближайшая доставка: </span>
        <span className={s.terms}>15.05.2021 </span>
      </div>
    </>
  );
};
