import React, { useState } from 'react';
import { DescriptionSection } from 'components/sections/card/DescriptionSection/DescriptionSection';

import { Slider } from 'components/common/Slider/Slider';
import { Product } from 'components/Product/Product';

import { Wrapper } from 'components/layout/Wrapper/Wrapper';
import { RecipesSliderSection } from 'components/sections/common/RecipesSliderSection/RecipesSliderSection';
import { Section } from 'components/layout/Section/Section';
import { windowSize } from 'constants.js';
import Link from 'next/link';
import APIBitrix from 'api/APIBitrix';
import g from '/src/styles/Main.module.scss';
import { useClientSide } from 'hooks.js';
import Head from 'next/head';

const Card = ({ id, product, products, posts, seo }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const sliderParams = {
    slider: {
      slidesPerView: 'auto',
      slidesPerGroup: 1,
      spaceBetween: 0,
      slideClass: 'product_slide',
      className: 'slider_border',
      breakpoints: {
        767: {
          slidesPerView: products.length >= 2 ? 2.002 : 'auto'
        },
        1023: {
          slidesPerView: products.length >= 3 ? 3.002 : 'auto'
        },
        1200: {
          slidesPerView: products.length >= 4 ? 4.002 : 'auto'
        }
      }
    },
    nav: {
      hide: windowSize <= 768,
      counter: false,
      seeAll: {
        visible: windowSize >= 0,
        position: 'newCenter',
        link: '/products'
      }
    }
  };

  const isClientSide = useClientSide();

  React.useEffect(() => {
    localStorage.removeItem('activeCaterogy');
    localStorage.removeItem('activeSubCaterogy');
    window && window.addEventListener('scroll', () => setScrollPosition(window.pageYOffset));
    window.addEventListener('popstate', () => window.scrollTo(0, scrollPosition));

  }, []);

  return (
    <>
      <Head>
        <meta name="keywords" content={seo?.meta_keywords || `KO&CO`} />
        <meta name="description" content={seo?.meta_description || `KO&CO`} />
        <title>{seo?.meta_title || `KO&CO`}</title>
        <script
        dangerouslySetInnerHTML={{
          __html: `history.scrollRestoration = "manual"`,
        }}
      />
      </Head>
      <Wrapper>
        <DescriptionSection product={product} id={id} />
        {products.length > 0 && (
          <Section>
            <Slider title={'Мы рекомендуем'} slides={products} params={sliderParams}>
              <Product additionClass={'card_slider'} />
            </Slider>
            {isClientSide && windowSize < 768 && (
              <Link href="/products">
                <a className={g.link}>Посмотреть все</a>
              </Link>
            )}
          </Section>
        )}
      </Wrapper>
      <RecipesSliderSection title="Рецепты" recipes={posts} />
    </>
  );
};

export default Card;

export const getServerSideProps = async ({ params }) => {
  const product = await APIBitrix.get(`products/item/${params.id}`);
  const posts = await APIBitrix.get(`articles/collection/`);
  const seo = await APIBitrix.get(`seo/product-item/${params.id}`);

  const { products = [] } = product;

  return { props: { id: params.id, product, products, posts, seo } };
};
