import React from "react";
import clsx from "clsx";
import Link from "next/link";
import {
  cartChangeModalState,
  favoriteChangeModalState,
  menuChangeModalState,
  menuModalSelector
} from "redux/slices/modals";

import { MainLogo } from "components/SVG/MainLogo";


import { Wrapper } from "components/layout/Wrapper/Wrapper";
import { FavoriteIcon, CartIcon, SearchIcon } from "components/SVG/Icons";
import { useDispatch, useSelector } from "react-redux";
import s from "./Header.module.scss";
import { SearchPanel } from "components/common/SearchPanel/SearchPanel";
import { isLoggedSelector } from "redux/slices/user";

const headerLinks = [
  { title: "Каталог", link: "/products" },
  { title: "Доставка", link: "/delivery" },
  { title: "Пункты продаж", link: "/sale-points" },
  { logo: true },
  { title: "Наше производство", link: "/farm" },
  { title: "Вопросы", link: "/questions" }
];

export const Header = ({ router }) => {

  const dispatch = useDispatch();
  const menuModalValue = useSelector(menuModalSelector);
  const isLogged = useSelector(isLoggedSelector);
  const [isSearchOpen, setSearchOpen] = React.useState(false);

  const favoriteModalHandler = () => {
    dispatch(favoriteChangeModalState(true));
  };

  const cartModalHandler = () => {
    dispatch(cartChangeModalState(true));
    dispatch(menuChangeModalState(false));
  };

  const menuModalHandler = (value) => {
    dispatch(menuChangeModalState(value));
  };

  const searchPanelHandler = (value) => {
    setSearchOpen(value);
  };


  const isPromoPage = router.pathname === "/";

  return (
    <>
      <header className={clsx(s.header, menuModalValue && s.menuOpen)}>
        <Wrapper>
          <div className={clsx(s.container, (isPromoPage || menuModalValue) ? s.border_accent : "")}>
            <nav className={s.nav}>
              {headerLinks.map((el, i) =>
                el.logo ? (
                  <Link href="/" key={i}>
                    <a onClick={() => menuModalHandler(false)} className={clsx(
                      s.logo,
                      (isPromoPage || menuModalValue) ? s.logo_accent : ""
                    )}
                    >
                      <MainLogo/>
                    </a>
                  </Link>
                ) : (
                  <Link href={el.link} key={i}>
                    <a className={clsx(
                      s.link,
                      isPromoPage && s.link_accent
                    )}
                    >
                      {el.title}
                    </a>
                  </Link>
                )
              )}
              {isLogged ?
                <Link href='/profile'>
                  <a className={clsx(s.link,
                    isPromoPage && s.link_accent
                  )}
                  >Профиль</a>
                </Link>
                : <Link href='/login'>
                  <a className={clsx(s.link,
                    isPromoPage && s.link_accent
                  )}
                  >
                    Войти
                  </a>
                </Link>

              }

            </nav>
            <div className={s.control}>
              {isSearchOpen && <SearchPanel setOpen={searchPanelHandler} isPromo={isPromoPage}/>}
              <button type="button"
                      className={clsx(s.button, s.search, isPromoPage && s.button_accent)}
                      onClick={() => searchPanelHandler(!isSearchOpen)}
              >
                <SearchIcon/>
              </button>
              <button
                type="button"
                className={clsx(s.button, s.favorite, isPromoPage && s.button_accent)}
                onClick={favoriteModalHandler}
              >
                <FavoriteIcon/>
              </button>
              <button
                type="button"
                className={clsx(s.button, s.cart, (isPromoPage || menuModalValue) && s.button_accent)}
                onClick={cartModalHandler}
              >
                <CartIcon/>
              </button>
            </div>
            <button
              type="button"
              className={clsx(s.burger, s.button, (isPromoPage || menuModalValue) && s.button_accent, menuModalValue && s.burgerOpen)}
              onClick={() => menuModalHandler(!menuModalValue)}>
              <span className={s.line}>
                <span/>
              </span>
            </button>
          </div>
        </Wrapper>
      </header>
    </>
  );
};
