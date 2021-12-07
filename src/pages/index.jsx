// @ts-nocheck
import React, { useEffect } from 'react';
import Head from 'next/head';

import { PromoSection } from 'components/sections/index/PromoSection/PromoSection';
import { NewTastesSection } from 'components/sections/common/NewTastesSection/NewTastesSection';
import { NewProductsSection } from 'components/sections/common/ProductsSection/newProductsSection';
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
import MockAPI from 'api/MockAPI';
import { useDispatch, useSelector } from 'react-redux';
import { favoriteItemsSelector } from 'redux/slices/favorite';
import { addToFavorite } from 'redux/slices/favorite';
import { successPurchasePopupChangeState, popUpChangeModalState } from 'redux/slices/modals';

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
const Index = ({ promoContent, discountProduct, categories, posts, newProducts, seo }) => {
  const cookiesModal = useModal(false, false);
  const dispatch = useDispatch();
  const itemsFavorite = useSelector(favoriteItemsSelector);

  useEffect(() => {
    setTimeout(() => {
      if (!getCookie('hideCookie')) {
        cookiesModal.showModal();
      }

      let favorite = JSON.parse(localStorage.getItem('itemsInFavorite'));

      if (!itemsFavorite.length && localStorage.getItem('itemsInFavorite')) {
        dispatch(addToFavorite(favorite));
      }
    }, 1000);
  }, []);

  useEffect(() => {
    // if (window && window.location?.search && window.location.search.includes('bxOrderId')) {
    //   // убрал текст из модалки временно
    //   dispatch(
    //     successPurchasePopupChangeState({
    //       visible: true,
    //       order: window.location.search.split('=')[1].split('&')[0]
    //       // mail: 'testmail'
    //     })
    //   );
    // }

    dispatch(
      popUpChangeModalState({
        visible: true,
        text: `На сайте ведутся технические работы!
          Для оформления заказа, перейдите по ссылке:
          http://koico-corp.store/
        `
      })
    );
  }, []);

  return (
    <>
      <Head>
        <meta name="keywords" content={seo?.meta_keywords || `KO&CO`} />
        <meta name="description" content={seo?.meta_description || `KO&CO`} />
        <title>{seo?.meta_title || `Главная страница`}</title>
      </Head>
      <PromoSection {...promoContent} />
      <NewTastesSection newProducts={newProducts} />
      <NewProductsSection products={[]} categories={categories} />
      {/* <DiscountSection {...discountProduct} /> */}
      <RecipesSliderSection recipes={posts} title="Рецепты" />
      <TelegramPromoSection />
      <InstagramSection />
      <PartnersSection />
      {cookiesModal.isShowed && (
        <ModalWrapper
          show={cookiesModal.isShowed}
          closeModal={cookiesModal.hideModal}
          {...cookiesModalProperties}
        >
          <Cookies close={cookiesModal.hideModal} />
        </ModalWrapper>
      )}
    </>
  );
};

export default Index;

export const getServerSideProps = async () => {
  const promoContent = await APIBitrix.get('content/main/promo-section/').then((res) => res[0]);
  const categories = await APIBitrix.get('products/categories/').then((res) => res);
  const newProducts = await APIBitrix.get('products/slider/').then((res) => res.products);
  const posts = await APIBitrix.get(`articles/collection/`);
  const seo = await APIBitrix.get(`seo/main-page/`);
  // const { discountProduct } = MockAPI.getData();

  return {
    props: {
      discountProduct: {
        image: '',
        offer: '10%',
        category: 'Бюш-де-шевр',
        name: '',
        date: 'До 15.05.2021',
        id: '40'
      },
      categories,
      posts,
      newProducts,
      promoContent,
      seo
    }
  };
};
