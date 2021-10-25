import React from "react";
import Head from "next/head";
import { Wrapper } from "components/layout/Wrapper/Wrapper";
import { WrapperNarrow } from "components/layout/WrapperNarrow/WrapperNarrow";
import { IntroSection } from "components/sections/article/IntroSection/IntroSection";
import { RecommendSection } from "components/sections/article/RecommendSection/RecommendSection";
import { StepsSection } from "components/sections/article/StepsSection/StepsSection";
import { RecipesSliderSection } from "components/sections/common/RecipesSliderSection/RecipesSliderSection";
import { windowSize } from "constants.js";
import { ShareControl } from "components/common/ShareControl/ShareControl";
import { BackButton } from "components/buttons/BackButton/BackButton";
import { useClientSide } from "hooks.js";
import APIBitrix from "api/APIBitrix";

const Article = ({ products, article, posts }) => {
  const isClientSide = useClientSide();
  return (
    <>
      <Head>
        <title>{article.name}</title>
      </Head>
      <Wrapper style={{ position: "relative" }}>
        {isClientSide && windowSize > 768 && <ShareControl title={article.name} back/>}
        {isClientSide && windowSize < 768 && <BackButton/>}
        <WrapperNarrow>
          <IntroSection article={article}/>
          <RecommendSection products={products}/>
          {article.stages && <StepsSection stages={article.stages}/>}
          {isClientSide && windowSize < 768 && <ShareControl title={article.name}/>}
        </WrapperNarrow>
      </Wrapper>
      <RecipesSliderSection recipes={posts} title="Другие рецепты"/>
    </>
  );
};

export default Article;

export const getServerSideProps = async ({ params }) => {
  const article = await APIBitrix.get(`articles/item/${params.id}`).then(res => res);
  const posts = await APIBitrix.get("articles/collection/");
  const { products } = article;
  return { props: { products, article, posts } };
};

