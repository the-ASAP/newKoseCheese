// @ts-nocheck
import React, { useState, useEffect } from 'react';

import { Product } from 'components/Product/Product';
import { Section } from 'components/layout/Section/Section';
import { Wrapper } from 'components/layout/Wrapper/Wrapper';
import { windowSize } from 'constants.js';
import { ProductLoader } from 'components/Product/ProductLoader/ProductLoader';
import { useClientSide } from 'hooks.js';

import APIBitrix from 'api/APIBitrix';
import s from './PopularSection.module.scss';

export const PopularSection = ({ products, categories }) => {
  const [categoryId, setCategoryId] = useState(categories[0].id);
  const [subCategoryId, setSubCategoryId] = useState(categories[0]?.subcategories[0]?.id);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [activeProducts, setActiveProducts] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [goodsPagination, setGoodsPage] = useState({
    perPage: 4,
    currentPage: 4,
    limit: 4
  });

  useEffect(() => {
    const id = localStorage.getItem('activeCategory');
    if (id) setCategoryId(id);
  }, []);

  useEffect(() => {
    let newActiveCategory = categories.find((category) => category?.id === categoryId);
    setActiveCategory(newActiveCategory);
  }, [categoryId]);

  useEffect(() => {
    if (activeCategory.subcategories) {
      setSubCategoryId(activeCategory.subcategories[0].id);
    } else {
      setLoading(activeCategory.id);
      setSubCategoryId(null);
    }
  }, [activeCategory]);

  useEffect(() => {
    if (subCategoryId) setLoading(subCategoryId);
  }, [subCategoryId]);

  useEffect(async () => {
    // const requestId = activeCategory.subcategories ? subCategoryId : activeCategory.id;
    if (isLoading) {
      const requestProducts = await APIBitrix.get(`products/collection/${isLoading}`);
      setActiveProducts(requestProducts);
    }
  }, [isLoading]);

  useEffect(() => {
    if (activeProducts !== false) {
      setLoading(false);
      setGoodsPage((prev) => ({ ...prev, limit: activeProducts.length }));
    }
  }, [activeProducts]);

  const isClientSide = useClientSide();

  const handleSetGoodsPagination = () => {
    setGoodsPage((prev) => ({ ...prev, currentPage: prev.currentPage + prev.perPage }));
  };

  return (
    <>
      <Section>
        <Wrapper>
            <h1 className={s.title}>Популярное</h1>
            <div className={s.body}>
              {activeProducts?.map((product) => {
                return <Product key={product.id} {...product} />;
              })}
            </div>

          {isClientSide &&
            windowSize <= 1200 &&
            goodsPagination.currentPage <= goodsPagination.limit && (
              <button type="button" className={s.more} onClick={handleSetGoodsPagination}>
                Показать еще <span>({goodsPagination.perPage})</span>
              </button>
            )}
        </Wrapper>
      </Section>
    </>
  );
};
