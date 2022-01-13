import React from 'react';
import Head from 'next/head';

import { NewProductsSection } from 'components/sections/common/ProductsSection/newProductsSection';
import { NewTastesSection } from 'components/sections/common/NewTastesSection/NewTastesSection';
// import { DiscountSection } from 'components/sections/common/DiscountSection/DiscountSection';
import { Discount } from 'components/common/Discount/Discount';
import { useModal } from 'hooks';
import { Wrapper } from 'components/layout/Wrapper/Wrapper';

import { H1 } from 'components/layout/H1/H1';
import APIBitrix from 'api/APIBitrix';
import MockAPI from 'api/MockAPI';

const Products = ({ newProducts, discountProduct, categories, seo }) => {
  const discountModal = useModal(false, false);

  return (
    <>
      <Head>
        <meta name="keywords" content={seo?.meta_keywords || `KO&CO`} />
        <meta name="description" content={seo?.meta_description || `KO&CO`} />
        <title>{seo?.meta_title || `Каталог`}</title>
      </Head>
      <Wrapper style={{marginTop: '6rem'}}>
        {discountModal.isShowed && (
          <Discount
            text="Вам представлена скидка на первый заказ 10%"
            close={discountModal.hideModal}
          />
        )}
        <H1>Каталог</H1>
      </Wrapper>
      <NewProductsSection products={[]} categories={categories} />
      <NewTastesSection title={'Новые вкусы'} newProducts={newProducts} />
      {/* <DiscountSection {...discountProduct} /> */}
    </>
  );
};

export default Products;

export const getServerSideProps = async () => {
  const categories = await APIBitrix.get('products/categories/');
  const newProducts = await APIBitrix.get('products/slider/new/').then((res) => res.products);
  // const { discountProduct } = await MockAPI.getData();
  const seo = await APIBitrix.get(`seo/catalog-page/`);

  return { props: { discountProduct: {}, newProducts, categories, seo } };
};
