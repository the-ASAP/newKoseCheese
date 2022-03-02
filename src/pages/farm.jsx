import React from 'react';

import { IntroSection } from 'components/sections/farm/IntroSection/IntroSection';
import { FarmContentLargeSection } from 'components/sections/farm/FarmContentLargeSection/FarmContentLargeSection';
import { FarmContentSmallSection } from 'components/sections/farm/FarmContentSmallSection/FarmContentSmallSection';
import { GallerySection } from 'components/sections/farm/GallerySection/GallerySection';
import { PlanSection } from 'components/sections/farm/PlanSection/PlanSection';
import Head from 'next/head';
import APIBitrix from 'api/APIBitrix';

const Farm = ({ content, seo }) => {
  const { section, items } = content
  return (
    <>
      <Head>
        <meta name="keywords" content={seo?.meta_keywords || `KO&CO`} />
        <meta name="description" content={seo?.meta_description || `KO&CO`} />
        <title>{seo?.meta_title || `KO&CO`}</title>
      </Head>
      <IntroSection pageData={section} />
      <FarmContentLargeSection pageData={items[0]} />
      <FarmContentSmallSection pageData={[items[1], items[2]]} firstItem="right" />
      <GallerySection pageData={items[3]} />
      <PlanSection pageData={items[4]} />
    </>
  );
};
export default Farm;

export const getServerSideProps = async ({ resolvedUrl }) => {
  const content = await APIBitrix.get(`content/farm/`).then(res => res);
  const seo = await APIBitrix.get(`seo/farm-page/`);

  return { props: { resolvedUrl, content, seo } };
};
