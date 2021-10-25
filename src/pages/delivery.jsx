import React from "react";
import Head from "next/head";

import { Wrapper } from "components/layout/Wrapper/Wrapper";
import { H1 } from "components/layout/H1/H1";
import { DeliverySection } from "components/sections/delivery/DeliverySection";
import MockAPI from "api/MockAPI";


const Delivery = ({ delivery }) => {
  return (
    <>
      <Head>
        <title>Доставка и оплата</title>
      </Head>
      <Wrapper>
        <H1>Доставка и оплата</H1>
        <DeliverySection deliveryData={delivery}/>
      </Wrapper>
    </>
  );
};

export default Delivery;

export const getServerSideProps = async () => {
  const { delivery } = await MockAPI.getData();
  return { props: { delivery } };
};