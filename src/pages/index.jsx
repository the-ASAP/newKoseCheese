// @ts-nocheck
import React, { useEffect } from 'react';
import Head from 'next/head';

import { PromoSection } from 'components/sections/index/PromoSection/PromoSection';
import { NewTastesSection } from 'components/sections/common/NewTastesSection/NewTastesSection';
import { NewProductsSection } from 'components/sections/common/ProductsSection/newProductsSection';
import { PopularSection } from 'components/sections/common/PopularSection/PopularSection';
import { DiscountSection } from 'components/sections/common/DiscountSection/DiscountSection';
import { RecipesSliderSection } from 'components/sections/common/RecipesSliderSection/RecipesSliderSection';
import { TelegramPromoSection } from 'components/sections/index/TelegramPromoSection/TelegramPromoSection';
import { InstagramSection } from 'components/sections/index/InstagramSection/InstagramSection';
import { ModalWrapper } from 'components/modals/ModalWrapper/ModalWrapper';
import { Cookies } from 'components/modals/Cookies/Cookies';

import { useModal } from 'hooks';

import { PartnersSection } from 'components/sections/index/PartnersSection/PartnersSection';
import APIBitrix from 'api/APIBitrix';
import { getCookie } from 'functions';
import { useDispatch, useSelector } from 'react-redux';
import { favoriteItemsSelector } from 'redux/slices/favorite';
import { addToFavorite } from 'redux/slices/favorite';
import { successPurchasePopupChangeState, popUpChangeModalState } from 'redux/slices/modals';
// import { addCategories } from 'redux/slices/categories'
import { categoriesItemsSelector } from 'redux/slices/categories';
import MainCookies from 'js-cookie';

const cookiesModalProperties = {
  animation: {
    animationShow: 'moveFromBottom',
    animationHide: 'moveToBottom'
  },
  classes: {
    boxClass: 'cookiesBox',
    containerClass: 'cookiesContainer'
  }
};
const Index = ({
  promoContent,
  discountProduct,
  categories,
  posts,
  newProducts,
  popularProducts,
  seo
}) => {
  const cookiesModal = useModal(false, false);
  // const categoriesInStore = useSelector(categoriesItemsSelector)
  const itemsFavorite = useSelector(favoriteItemsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    // if(categories && categoriesInStore.categories.length === 0) dispatch(addCategories(categories))

    setTimeout(() => {
      if (!MainCookies.get('hideCookie')) {
        cookiesModal.showModal();
      }

      let favorite = JSON.parse(localStorage.getItem('itemsInFavorite'));

      if (!itemsFavorite.length && localStorage.getItem('itemsInFavorite')) {
        dispatch(addToFavorite(favorite));
      }
    }, 1000);
  }, []);

  useEffect(async () => {
    if (window && window.location?.search && window.location.search.includes('bxOrderId')) {
      // убрал текст из модалки временно
      dispatch(
        successPurchasePopupChangeState({
          visible: true,
          order: window.location.search.split('=')[1].split('&')[0]
        })
      );

      const bxOrderId = new URLSearchParams(window.location.search).get('bxOrderId')
      const orderId = new URLSearchParams(window.location.search).get('orderId')

      if (bxOrderId, orderId) {
        await APIBitrix.post('payment/status/', {
          bxOrderId, orderId
        })
      }
    }
  }, []);

  return (
    <>
      <Head>
        <meta name="keywords" content={seo?.meta_keywords || `KO&CO`} />
        <meta name="description" content={seo?.meta_description || `KO&CO`} />
        <title>{seo?.meta_title || `Главная страница`}</title>
        <script
          dangerouslySetInnerHTML={{
            __html: `history.scrollRestoration = "manual"`
          }}
        />
      </Head>
      {categories && <PromoSection {...promoContent} categories={categories} />}
      {newProducts && <NewTastesSection title={'Новые вкусы'} newProducts={newProducts} />}
      {categories && <PopularSection products={popularProducts} categories={categories} />}
      {/* <DiscountSection {...discountProduct} /> */}

      {posts && <RecipesSliderSection recipes={posts} title="Рецепты" />}
      {/* <TelegramPromoSection /> */}
      {/* <InstagramSection /> */}
      <PartnersSection />

      <ModalWrapper
        show={cookiesModal.isShowed}
        closeModal={cookiesModal.hideModal}
        {...cookiesModalProperties}
      >
        <Cookies close={cookiesModal.hideModal} />
      </ModalWrapper>
    </>
  );
};

export default Index;

export const getServerSideProps = async () => {
  const promoContent = await APIBitrix.get('content/main/promo-section/').then((res) => res[0]);
  const categories = await APIBitrix.get('products/categories/').then((res) => res);
  const newProducts = await APIBitrix.get('products/slider/new/').then((res) => res.products);
  const popularProducts = await APIBitrix.get('products/slider/popular/').then(
    (res) => res.products
  );
  const posts = await APIBitrix.get(`articles/collection/`);
  const seo = await APIBitrix.get(`seo/main-page/`);
  // const { discountProduct } = MockAPI.getData();

  return {
    props: {
      categories,
      posts,
      newProducts,
      popularProducts,
      promoContent,
      seo
    }
  };
};
