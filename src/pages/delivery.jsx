import React from 'react';
import Head from 'next/head';
import { Wrapper } from 'components/layout/Wrapper/Wrapper';
import { H1 } from 'components/layout/H1/H1';
import { DeliverySection } from 'components/sections/delivery/DeliverySection';
import { delivery } from '../api/content';

const Delivery = ({ items }) => (
  <>
    <Head>
      <title>Доставка и оплата</title>
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

  return { props: { items } };
};
