import React from "react";
import Link from "next/link";
import clsx from "clsx";
import { CartIconMobile, FavoriteIconMobile, GeoIcon, ProfileIcon } from "components/SVG/Icons";
import { useDispatch, useSelector } from "react-redux";
import {
  cartChangeModalState, cartModalSelector,
  favoriteChangeModalState, favoriteModalSelector,
  menuChangeModalState,
  menuModalSelector,
  closeAllModals
} from "redux/slices/modals";
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

  return (
    <div className={s.container}>
      <Link href="/sale-points">
        <a className={s.button}>
          <GeoIcon/>
        </a>
      </Link>
      <Link href="/login">
        <a className={s.button} onClick={() => dispatch(closeAllModals())}>
          <ProfileIcon/>
        </a>
      </Link>
      <button type="button"
              onClick={cartModalHandler} className={s.button}>
        <CartIconMobile/>
      </button>
      <button type="button"
              onClick={favoriteModalHandler} className={s.button}>
        <FavoriteIconMobile/>
      </button>
      <button type="button"
              onClick={menuModalHandler}
              className={clsx(s.button, s.burger, menuModalValue && s.burgerOpen)}>
         <span className={s.line}>
                <span/>
         </span>
      </button>
    </div>
  );
};

