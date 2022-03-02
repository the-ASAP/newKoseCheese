import React from "react";
import { IntroSection } from "components/sections/farm/IntroSection/IntroSection";
import { FarmContentLargeSection } from "components/sections/farm/FarmContentLargeSection/FarmContentLargeSection";
import { FarmContentSmallSection } from "components/sections/farm/FarmContentSmallSection/FarmContentSmallSection";
import { GallerySection } from "components/sections/farm/GallerySection/GallerySection";
import { CheeseboardBackground } from "components/common/CheeseboardBackground/CheeseboardBackground";
import Head from "next/head";
import APIBitrix from 'api/APIBitrix';

const Cheeseboard = ({ content }) => {
  const { section, items } = content

  return (
    <>
      <Head>
        <title>Сыроварня</title>
      </Head>
      <IntroSection pageData={section} />
      <FarmContentSmallSection pageData={[items[0], items[1]]} firstItem="left"/>
      <GallerySection pageData={items[2]}/>
      <FarmContentLargeSection pageData={items[3]} />
      <CheeseboardBackground />
    </>
  )
};

export default Cheeseboard;

export const getServerSideProps = async () => {
  const content = await APIBitrix.get(`content/cheese-factory/`).then(res => res);

  return { props: { content } };
};
