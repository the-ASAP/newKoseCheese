import React from "react";
import Head from "next/head";

import { ProductsSection } from "components/sections/common/ProductsSection/ProductsSection";
import { NewTastesSection } from "components/sections/common/NewTastesSection/NewTastesSection";
import { DiscountSection } from "components/sections/common/DiscountSection/DiscountSection";
import { Discount } from "components/common/Discount/Discount";
import { useModal } from "hooks";
import { Wrapper } from "components/layout/Wrapper/Wrapper";

import { H1 } from "components/layout/H1/H1";
import APIBitrix from "api/APIBitrix";
import MockAPI from "api/MockAPI";

const Products = ({ newProducts, discountProduct, categories }) => {
  const discountModal = useModal(true, false);
  return (
    <>
      <Head>
        <title>Каталог</title>
      </Head>
      <Wrapper>
        {discountModal.isShowed && (
          <Discount
            text="Вам представлена скидка на первый заказ 10%"
            close={discountModal.hideModal}
          />
        )}
        <H1>Продукция</H1>
      </Wrapper>
      <ProductsSection products={[]} categories={categories}/>
      <NewTastesSection newProducts={newProducts}/>
      <DiscountSection {...discountProduct}/>
    </>
  );
};

export default Products;

export const getServerSideProps = async () => {
  const categories = await APIBitrix.get('products/categories/');
  const newProducts = await APIBitrix.get('products/slider/').then(res => res.products);
  const { discountProduct } = await MockAPI.getData();
  return { props: {  discountProduct, newProducts, categories } };
};
