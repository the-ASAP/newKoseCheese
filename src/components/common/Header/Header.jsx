// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  favoriteChangeModalState,
  menuChangeModalState,
  menuModalSelector
} from 'redux/slices/modals';
import { categoriesItemsSelector } from 'redux/slices/categories';
import { windowSize } from 'constants.js';
import { useClientSide } from 'hooks.js';
import { MainLogo } from 'components/SVG/MainLogo';

import { Wrapper } from 'components/layout/Wrapper/Wrapper';
import { FavoriteIcon, SearchIcon } from 'components/SVG/Icons';
import { useDispatch, useSelector } from 'react-redux';
import { SearchPanel } from 'components/common/SearchPanel/SearchPanel';

import { FavoriteButton } from 'components/buttons/FavoriteButton/FavoriteButton';
import { CartButton } from 'components/buttons/CartButton/CartButton';

import { NewTabs } from 'components/layout/Tabs/NewTabs';
import { NewSubcategoryButton } from 'components/buttons/SubcategoryButton/NewSubcategoryButton';

import s from './Header.module.scss';

const headerLinks = [
  { title: 'Ферма', link: '/farm' },
  { title: 'Сыроварня', link: '/cheeseboard' },
  { title: 'Контроль качества', link: '/control' },
  { title: 'Рецепты', link: '/articles' },
  { logo: true },
  { title: 'Условия доставки', link: '/delivery' },
  { title: 'Вопросы', link: '/questions' }
];

export const Header = ({ router, cat }) => {
  const dispatch = useDispatch();
  const menuModalValue = useSelector(menuModalSelector);
  const { categories } = useSelector(categoriesItemsSelector);
  const [isSearchOpen, setSearchOpen] = React.useState(false);

  const menuModalHandler = (value) => {
    dispatch(menuChangeModalState(value));
  };

  const searchPanelHandler = (value) => {
    setSearchOpen(value);
  };

  const isPromoPage = router.pathname === '/';
  const notCatalogPage = router.pathname !== '/products';

  const [headerColors, setHeaderColors] = useState(true);

  const [useShowButtonId, setUseShowButtonId] = useState(null);
  const [mouseEnter, setMouseEnter] = useState(false);
  const [moveData, setMoveData] = useState([]);
  const isClientSide = useClientSide();

  const onMouseEnter = (id) => {
    setUseShowButtonId(id);
    setMouseEnter(true);
  };

  const onMouseLeave = (id) => {
    setMouseEnter(false);
    setMoveData([new Date(), null]);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      if (mouseEnter === false) setUseShowButtonId(null);
    }, 800);
    return () => clearTimeout(handler);
  }, [moveData, mouseEnter]);

  useEffect(() => {
    const dontShowButton = () => setUseShowButtonId(null);
    window.addEventListener('click', dontShowButton());

    const clearFunc = () => {
      window.removeEventListener('click', dontShowButton());
    };
    return clearFunc();
  }, []);

  return (
    <>
      <header
        className={clsx(
          s.header,
          s.positionFixed,
          !isPromoPage && s.newColor,
          isPromoPage && headerColors && s.newColor,
          menuModalValue && s.menuOpen
        )}
      >
        <Wrapper>
          <div className={s.mainContainer}>
            <div
              className={clsx(
                s.container,
                isPromoPage && !headerColors && s.border_accent,
                isPromoPage && s.positionFixed
              )}
            >
              <nav className={s.nav}>
                {headerLinks.map((el, i) =>
                  el.logo ? (
                    <Link href="/" key={i}>
                      <a
                        // onClick={() => menuModalHandler(false)}
                        onClick={() => router.push('/')}
                        className={clsx(
                          s.logo,
                          (isPromoPage || menuModalValue) && !headerColors ? s.logo_accent : ''
                        )}
                      >
                        <MainLogo />
                      </a>
                    </Link>
                  ) : (
                    <Link href={el.link} key={i}>
                      <a className={clsx(s.link, isPromoPage && !headerColors && s.link_accent)}>
                        {el.title}
                      </a>
                    </Link>
                  )
                )}

                {/* Временно блок скрыт */}
                {/* {isLogged ? (
                <Link href="/profile">
                  <a className={clsx(s.link, isPromoPage && s.link_accent)}>Профиль</a>
                </Link>
              ) : (
                <Link href="/login">
                  <a className={clsx(s.link, isPromoPage && s.link_accent)}>Войти</a>
                </Link>
              )} */}
                {/* <Link href="/profile">
                  <a className={clsx(s.link, isPromoPage && !headerColors && s.link_accent)}>
                    Профиль
                  </a>
                </Link> */}
              </nav>
              <div className={s.control}>
                {isClientSide && windowSize > 768 && (
                  <>
                    {isSearchOpen && <SearchPanel setOpen={searchPanelHandler} />}
                    <button
                      type="button"
                      className={clsx(
                        s.button,
                        s.search,
                        isPromoPage && !headerColors && s.button_accent
                      )}
                      onClick={() => searchPanelHandler(!isSearchOpen)}
                    >
                      <SearchIcon />
                    </button>
                    <FavoriteButton
                      router={router}
                      headerColors={headerColors}
                      isPromoPage={isPromoPage}
                    />
                    <CartButton
                      router={router}
                      headerColors={headerColors}
                      isPromoPage={isPromoPage}
                    />
                  </>
                )}
              </div>
              <button
                type="button"
                className={clsx(
                  s.burger,
                  s.button,
                  // (isPromoPage || menuModalValue) && s.button_accent,
                  menuModalValue && s.burgerOpen
                )}
                onClick={() => menuModalHandler(!menuModalValue)}
              >
                <span className={s.line}>
                  <span />
                </span>
              </button>
            </div>
            {isClientSide && notCatalogPage && (
              <NewTabs>
                {categories?.map(({ name, id, subcategories }) => (
                  <NewSubcategoryButton
                    key={id}
                    title={name}
                    id={id}
                    subcategories={subcategories}
                    setShowButtonId={setUseShowButtonId}
                    showButtonId={useShowButtonId}
                    onMouseEnter={() => onMouseEnter(id)}
                    onMouseLeave={() => onMouseLeave()}
                    onMouseEnterCat={() => onMouseEnter(id)}
                    onMouseLeaveCat={() => onMouseLeave()}
                  />
                ))}
              </NewTabs>
            )}
          </div>
        </Wrapper>
      </header>
    </>
  );
};
