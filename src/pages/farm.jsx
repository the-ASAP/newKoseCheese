import React from 'react';

import { IntroSection } from 'components/sections/farm/IntroSection/IntroSection';
import { FarmContentLargeSection } from 'components/sections/farm/FarmContentLargeSection/FarmContentLargeSection';
import { FarmContentSmallSection } from 'components/sections/farm/FarmContentSmallSection/FarmContentSmallSection';
import { GallerySection } from 'components/sections/farm/GallerySection/GallerySection';
import { PlanSection } from 'components/sections/farm/PlanSection/PlanSection';
import Head from 'next/head';
import MockAPI from 'api/MockAPI';
import APIBitrix from 'api/APIBitrix';

const Farm = ({ farmCategories, resolvedUrl, farm, seo }) => {
  return (
    <>
      <Head>
        <meta name="keywords" content={seo?.meta_keywords || `KO&CO`} />
        <meta name="description" content={seo?.meta_description || `KO&CO`} />
        <title>{seo?.meta_title || `KO&CO`}</title>
      </Head>
      <IntroSection categories={farmCategories} url={resolvedUrl} pageData={farm} />
      <FarmContentLargeSection pageData={farm} />
      <FarmContentSmallSection pageData={farm} firstItem="right" />
      {farm.gallery && <GallerySection pageData={farm} />}
      <PlanSection pageData={farm} />
    </>
  );
};
export default Farm;

export const getServerSideProps = async ({ resolvedUrl }) => {
  const { farm, farmCategories } = await MockAPI.getData();
  const seo = await APIBitrix.get(`seo/farm-page/`);

  return { props: { resolvedUrl, farmCategories, farm, seo } };
};
