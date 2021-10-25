import React from "react";
import Head from "next/head";

import { Wrapper } from "components/layout/Wrapper/Wrapper";
import { H1 } from "components/layout/H1/H1";
import { RecipesSection } from "components/sections/recipes/RecipesSection";

import APIBitrix from "api/APIBitrix";

const Index = ({ categories }) => {
    return (
      <>
        <Head>
          <title>Статьи</title>
        </Head>
        <Wrapper>
          <H1>Культура потребления</H1>
          <RecipesSection categories={categories} items={[]}/>
        </Wrapper>
      </>
    );
  }
;

export default Index;


export const getServerSideProps = async () => {
  const categories = await APIBitrix.get("articles/categories/");
  return { props: { categories } };
};

