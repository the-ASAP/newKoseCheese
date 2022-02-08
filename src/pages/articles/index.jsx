import React from "react";
import Head from "next/head";

import { Wrapper } from "components/layout/Wrapper/Wrapper";
import { H1 } from "components/layout/H1/H1";
import { RecipesSection } from "components/sections/recipes/RecipesSection";

import APIBitrix from "api/APIBitrix";

const Index = ({ categories, activePosts }) => {
    return (
      <>
        <Head>
          <title>Статьи</title>
        </Head>
        <Wrapper>
          <H1 additionClass={'products'}>Культура потребления</H1>
          <RecipesSection categories={[categories[0]]} items={activePosts} />
        </Wrapper>
      </>
    );
  }
;

export default Index;


export const getServerSideProps = async () => {
  const categories = await APIBitrix.get("articles/categories/");
  const post1 = await APIBitrix.get(`articles/collection/25`);
  const post2 = await APIBitrix.get(`articles/collection/26`);
  const activePosts = [...post1, ...post2] 
  return { props: { categories, activePosts } };
};

