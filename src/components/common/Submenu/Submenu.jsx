// @ts-nocheck
import React, {useState, useEffect} from "react";
import Link from "next/link";
import clsx from "clsx";
import { CartIconMobile, FavoriteIconMobile, ProductsIcon, ProfileIcon } from "components/SVG/Icons";
import { useDispatch, useSelector } from "react-redux";
import {
  cartChangeModalState, cartModalSelector,
  favoriteChangeModalState, favoriteModalSelector,
  menuChangeModalState,
  menuModalSelector,
  closeAllModals
} from "redux/slices/modals";
import { cartItemsSelector } from 'redux/slices/cart';
import s from "./Submenu.module.scss";

export const Submenu = () => {
  const dispatch = useDispatch();

  const menuModalValue = useSelector(menuModalSelector);
  const favoriteModalValue = useSelector(favoriteModalSelector);
  const cartModalValue = useSelector(cartModalSelector);

  const favoriteModalHandler = () => {
    dispatch(closeAllModals());
    dispatch(favoriteChangeModalState(!favoriteModalValue));
  };

  const cartModalHandler = () => {
    dispatch(closeAllModals());
    dispatch(cartChangeModalState(!cartModalValue));
  };

  const menuModalHandler = () => {
    dispatch(closeAllModals());
    dispatch(menuChangeModalState(!menuModalValue));
  };

  const itemsInCart = useSelector(cartItemsSelector);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const res = itemsInCart.reduce((acc, item) => (acc += Number(item.quantity)), 0);
    setCount(res);
  }, [itemsInCart]);


  return (
    <div className={s.container}>
      <Link href="/products">
        <a className={s.button} onClick={() => dispatch(closeAllModals())}>
          <ProductsIcon/>
          <span className={s.text}>Каталог</span>
        </a>
      </Link>
      <Link href="/login">
        <a className={s.button} onClick={() => dispatch(closeAllModals())}>
          <ProfileIcon/>
          <span className={s.text}>Профиль</span>
        </a>
      </Link>
      <button type="button"
              onClick={cartModalHandler} className={s.button}>
        <CartIconMobile/>
        <span className={s.text}>Корзина</span>
        {count > 0 && <div className={s.circle}>{count}</div>}
      </button>
      <button type="button"
              onClick={favoriteModalHandler} className={s.button}>
        <FavoriteIconMobile/>
        <span className={s.text}>Избранное</span>
      </button>
      <button type="button"
              onClick={menuModalHandler}
              className={clsx(s.button, s.burger, menuModalValue && s.burgerOpen)}>
         <svg width="1.5rem" height="0.75rem" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 1H14" stroke="#FAEEE2" strokeWidth="1.24365"/>
          <path d="M0 6H14" stroke="#FAEEE2" strokeWidth="1.24365"/>
          <path d="M0 11H14" stroke="#FAEEE2" strokeWidth="1.24365"/>
        </svg>
        <span className={s.text}>Меню</span>
      </button>
    </div>
  );
};