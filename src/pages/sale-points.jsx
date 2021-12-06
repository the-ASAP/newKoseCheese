import React from 'react';

import { H1 } from 'components/layout/H1/H1';
import { SalePointsSection } from 'components/sections/sale-points/SalePointsSection';
import Head from 'next/head';
import APIBitrix from 'api/APIBitrix';

const SalePoints = ({ seo }) => {
  return (
    <>
      <Head>
        <meta name="keywords" content={seo?.meta_keywords || `KO&CO`} />
        <meta name="description" content={seo?.meta_description || `KO&CO`} />
        <title>{seo?.meta_title || `KO&CO`}</title>
      </Head>
      <H1>Точки продаж</H1>
      <SalePointsSection />
    </>
  );
};

export default SalePoints;

export const getServerSideProps = async () => {
  const seo = await APIBitrix.get(`seo/points-page/`);

  return { props: { seo } };
};
