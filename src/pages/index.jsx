import React from "react";
import Head from "next/head";

import { PromoSection } from "components/sections/index/PromoSection/PromoSection";
import { NewTastesSection } from "components/sections/common/NewTastesSection/NewTastesSection";
import { ProductsSection } from "components/sections/common/ProductsSection/ProductsSection";
import { DiscountSection } from "components/sections/common/DiscountSection/DiscountSection";
import { RecipesSliderSection } from "components/sections/common/RecipesSliderSection/RecipesSliderSection";
import { TelegramPromoSection } from "components/sections/index/TelegramPromoSection/TelegramPromoSection";
import { InstagramSection } from "components/sections/index/InstagramSection/InstagramSection";
import { ModalWrapper } from "components/modals/ModalWrapper/ModalWrapper";
import { Cookies } from "components/modals/Cookies/Cookies";

import { useModal } from "hooks";

import { PartnersSection } from "components/sections/index/PartnersSection/PartnersSection";
import APIBitrix from "api/APIBitrix";
import { getCookie } from "functions";
import MockAPI from "api/MockAPI";

const cookiesModalProperties = {
  animation: {
    animationShow: "moveFromBottom",
    animationHide: "moveToBottom"
  },
  classes: {
    boxClass: "cookiesBox",
    containerClass: "cookiesContainer"
  }
};

const Index = ({ promoContent, discountProduct, categories, posts, newProducts }) => {

  const cookiesModal = useModal(false, false);
  React.useEffect(() => {
    setTimeout(() => {
      if (!getCookie("hideCookie")) {
        cookiesModal.showModal();
      }
    }, 1000);
  }, []);

  return (
    <>
      <Head>
        <title>Главная</title>
      </Head>
      <PromoSection {...promoContent}/>
      <NewTastesSection newProducts={newProducts}/>
      <ProductsSection products={[]} categories={categories}/>
      <DiscountSection {...discountProduct}/>
      <RecipesSliderSection recipes={posts} title="Рецепты"/>
      <TelegramPromoSection url={"http://instagram.com/instagram"}/>
      <InstagramSection/>
      <PartnersSection/>
      {
        cookiesModal.isShowed &&
        <ModalWrapper show={cookiesModal.isShowed} closeModal={cookiesModal.hideModal} {...cookiesModalProperties}>
          <Cookies close={cookiesModal.hideModal}/>
        </ModalWrapper>
      }
    </>
  );
};

export default Index;

export const getServerSideProps = async () => {
  const promoContent = await APIBitrix.get("content/main/promo-section/").then(res => res[0]);
  const categories = await APIBitrix.get("products/categories/").then(res => res);
  const newProducts = await APIBitrix.get("products/slider/").then(res => res.products);
  const posts = await APIBitrix.get(`articles/collection/`);
  const { discountProduct } = await MockAPI.getData();
  return { props: { discountProduct, categories, posts, newProducts, promoContent } };
};


