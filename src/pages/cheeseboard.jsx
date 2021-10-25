import React from "react";
import { IntroSection } from "components/sections/farm/IntroSection/IntroSection";
import { FarmContentLargeSection } from "components/sections/farm/FarmContentLargeSection/FarmContentLargeSection";
import { FarmContentSmallSection } from "components/sections/farm/FarmContentSmallSection/FarmContentSmallSection";
import { GallerySection } from "components/sections/farm/GallerySection/GallerySection";
import { CheeseboardBackground } from "components/common/CheeseboardBackground/CheeseboardBackground";
import Head from "next/head";
import MockAPI from "api/MockAPI";


const Cheeseboard = ({ farmCategories, resolvedUrl, cheeseboard }) => (
  <>
    <Head>
      <title>Сыроварня</title>
    </Head>
    <IntroSection categories={farmCategories} url={resolvedUrl} pageData={cheeseboard}/>
    <FarmContentSmallSection pageData={cheeseboard} firstItem="left"/>
    {cheeseboard.gallery && <GallerySection pageData={cheeseboard}/>}
    <FarmContentLargeSection pageData={cheeseboard} />
    <CheeseboardBackground />
  </>
);

export default Cheeseboard;

export const getServerSideProps = async ({ resolvedUrl }) => {
  const { cheeseboard, farmCategories } = await MockAPI.getData();
  return { props: { resolvedUrl, farmCategories, cheeseboard } };
};

