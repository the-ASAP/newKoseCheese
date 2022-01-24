// @ts-nocheck
import React, { useState, useEffect } from 'react';

import { Product } from 'components/Product/Product';
import { SubcategoryButton } from 'components/buttons/SubcategoryButton/SubcategoryButton';
import { Tabs } from 'components/layout/Tabs/Tabs';
import { Section } from 'components/layout/Section/Section';
import { Wrapper } from 'components/layout/Wrapper/Wrapper';
import { windowSize } from 'constants.js';
import { ProductLoader } from 'components/Product/ProductLoader/ProductLoader';
import { useClientSide } from 'hooks.js';

import APIBitrix from 'api/APIBitrix';
import { DropdownCustom } from 'components/common/DropdownCustom/DropdownCustom';
import { NewDropdownCustom } from 'components/common/DropdownCustom/NewDropdownCustom';
import { sortProductsFunction } from 'functions';
import { filterDropdown } from 'constants.js';
import s from './ProductsSection.module.scss';

export const NewProductsSection = ({ products, categories }) => {
  const [categoryId, setCategoryId] = useState(null);
  const [subCategoryId, setSubCategoryId] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeProducts, setActiveProducts] = useState(false);
  const [sortProducts, setSortProducts] = useState(null);
  const [isLoading, setLoading] = useState(false);
  // const [goodsPagination, setGoodsPage] = useState({
  //   perPage: 4,
  //   currentPage: 4,
  //   limit: 4
  // });

  useEffect(() => {
    const id = localStorage.getItem('activeCategory');
    if (id) setCategoryId(id);
    else setCategoryId(categories[0]?.id)
  }, []);

  useEffect(() => {
    if(categoryId) {
      let newActiveCategory = categories.find((category) => category?.id === categoryId);
      setActiveCategory(newActiveCategory);
    }
  }, [categoryId]);

  useEffect(() => {
    if (activeCategory?.subcategories) {
      const subId = localStorage.getItem('activeSubCaterogy')
      if(subId) setSubCategoryId(subId)
      else setSubCategoryId(activeCategory?.subcategories[0].id);
    } else {
      setSubCategoryId(null);
      setLoading(activeCategory?.id);
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
      // setGoodsPage((prev) => ({ ...prev, limit: activeProducts.length }));

      const sortArr = sortProductsFunction(activeProducts, filterDropdown[0].value, filterDropdown[0].sort)
      setSortProducts(sortArr)
    }
  }, [activeProducts]);

  const isClientSide = useClientSide();

  const selectHandlerForDropdown = (name) => {
    const thatCategory = categories.find((category) => category.name === name).id;
    setCategoryId(thatCategory);
  };

  const handleSelectCategory = (id) => {
    setCategoryId(id);
    localStorage.setItem('activeCategory', id);
  };

  // const handleSetGoodsPagination = () => {
  //   setGoodsPage((prev) => ({ ...prev, currentPage: prev.currentPage + prev.perPage }));
  // };

  return (
    <>
      <Section>
        <Wrapper>
          <div className={s.header}>
           
              <Tabs>
                {categories.map(({ name, id }) => (
                  <SubcategoryButton
                    key={id}
                    title={name}
                    id={id}
                    active={categoryId}
                    toggleActive={handleSelectCategory}
                  />
                ))}
              </Tabs>
            
            {activeCategory?.subcategories && (
              <div className={s.subcategories}>
                {activeCategory.subcategories.map(({ name, id }) => (
                  <SubcategoryButton
                    key={id}
                    id={id}
                    title={name}
                    active={subCategoryId}
                    toggleActive={setSubCategoryId}
                    additionClass="product"
                  />
                ))}
              </div>
            )}
          </div>
            
          <div>
            <NewDropdownCustom
              value={filterDropdown[0]?.title}
              options={filterDropdown.map(elem => elem.title)}
              selectHandler={(e) => {
                filterDropdown.forEach(elem => {
                  if(elem.title === e.value) {
                    const sortArr = sortProductsFunction(activeProducts, elem.value, elem.sort)
                    setSortProducts([...sortArr])  
                  }
                })
              }}
            />
          </div>
          {isLoading ? (
            <ProductLoader />
          ) : (
            sortProducts?.length > 0 && (
              <div className={s.body}>
                {sortProducts.map((product) => {
                  return product.status && <Product key={product.id} {...product} />
                })}
              </div>
            )
          )}
          {/* {isClientSide &&
            windowSize <= 1200 &&
            goodsPagination.currentPage <= goodsPagination.limit && (
              <button type="button" className={s.more} onClick={handleSetGoodsPagination}>
                Показать еще <span>({goodsPagination.perPage})</span>
              </button>
            )} */}
        </Wrapper>
      </Section>
    </>
  );
};
