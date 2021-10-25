import React from "react";
import { DescriptionSection } from "components/sections/card/DescriptionSection/DescriptionSection";

import { Slider } from "components/common/Slider/Slider";
import { Product } from "components/Product/Product";


import { Wrapper } from "components/layout/Wrapper/Wrapper";
import { RecipesSliderSection } from "components/sections/common/RecipesSliderSection/RecipesSliderSection";
import { Section } from "components/layout/Section/Section";
import { windowSize } from "constants.js";
import Link from "next/link";
import APIBitrix from "api/APIBitrix";
import g from "/src/styles/Main.module.scss";
import { useClientSide } from "hooks.js";
import Head from "next/head";


const Card = ({ id, product, products, posts }) => {

  const sliderParams = {
    slider: {
      slidesPerView: "auto",
      slidesPerGroup: 1,
      spaceBetween: 0,
      slideClass: "product_slide",
      className: "slider_border",
      breakpoints: {
        767: {
          slidesPerView: products.length >= 2 ? 2.002 : "auto"
        },
        1023: {
          slidesPerView: products.length >= 3 ? 3.002 : "auto"
        },
        1200: {
          slidesPerView: products.length >= 4 ? 4.002 : "auto"
        }
      }
    },
    nav: {
      hide: windowSize <= 768,
      counter: false,
      seeAll: {
        visible: windowSize >= 768 && true,
        position: windowSize >= 768 ? "right" : "bottom",
        link: "/products"
      }
    }
  };

  const isClientSide = useClientSide();

  return (
    <>
      <Head>
        <title>{product.name}</title>
      </Head>
      <Wrapper>
        <DescriptionSection product={product} id={id}/>
        {
          products.length &&
          <Section>
            <Slider title={"Мы рекомендуем"} slides={products} params={sliderParams}>
              <Product additionClass={"card_slider"}/>
            </Slider>
            {
              isClientSide &&
              windowSize < 768 &&
              <Link href="/products">
                <a className={g.link}>Посмотреть все</a>
              </Link>
            }
          </Section>
        }
      </Wrapper>
      <RecipesSliderSection title="Рецепты" recipes={posts}/>
    </>
  );
};

export default Card;


export const getServerSideProps = async ({ params }) => {
  const product = await APIBitrix.get(`products/item/${params.id}`);
  const posts = await APIBitrix.get(`articles/collection/`);
  const { products = [] } = product;
  return { props: { id: params.id, product, products, posts } };
};
