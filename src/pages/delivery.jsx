import React from 'react';
import Head from 'next/head';
import { Wrapper } from 'components/layout/Wrapper/Wrapper';
import { H1 } from 'components/layout/H1/H1';
import { DeliverySection } from 'components/sections/delivery/DeliverySection';
import { delivery } from '../api/content';
import APIBitrix from 'api/APIBitrix';

const Delivery = ({ items, seo }) => (
  <>
    <Head>
      <meta name="keywords" content={seo?.meta_keywords || `KO&CO`} />
      <meta name="description" content={seo?.meta_description || `KO&CO`} />
      <title>{seo?.meta_title || `KO&CO`}</title>
    </Head>
    <Wrapper>
      <H1>Доставка и оплата</H1>
      <DeliverySection deliveryTitles={items} />
    </Wrapper>
  </>
);

export default Delivery;

export const getServerSideProps = async () => {
  const items = await delivery.getDeliveryItems();
  const seo = await APIBitrix.get(`seo/info-page/`);

  return { props: { items, seo } };
};
