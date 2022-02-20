// @ts-nocheck
import React, { useState, useEffect, useCallback, useRef } from 'react';

import { Product } from 'components/Product/Product';
import { SubcategoryButton } from 'components/buttons/SubcategoryButton/SubcategoryButton';
import { Tabs } from 'components/layout/Tabs/Tabs';
import { Section } from 'components/layout/Section/Section';
import { Wrapper } from 'components/layout/Wrapper/Wrapper';
import { windowSize } from 'constants.js';
import { ProductLoader } from 'components/Product/ProductLoader/ProductLoader';
import { useClientSide } from 'hooks.js';
import clsx from 'clsx';
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
  const [paginationCategory, setPaginationCategory] = useState(null);
  const [activeProducts, setActiveProducts] = useState([]);
  const [sortProducts, setSortProducts] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [fetching, setFetching] = useState(true);
  const productsRef = useRef(null);

  useEffect(async () => {
    try {
      if (fetching) {
        const requestProducts = await APIBitrix.post(`products/collection/all/`, {
          section_id:
            paginationCategory || localStorage.getItem('activeCategory') || categories[0]?.id,
          page: currentPage,
          limit: 10
        });
        await setTotalCount(requestProducts?.data.count);
        await setActiveProducts((prevState) => [...prevState, ...requestProducts.data.items]);
        setCurrentPage((prevState) => prevState + 1);
      }
    } finally {
      setFetching(false);
    }
  }, [fetching, paginationCategory]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);

    return () => document.removeEventListener('scroll', scrollHandler);
  }, [fetching]);

  const setCategoryForPagination = (id) => {
    setPaginationCategory(id);
    setFetching(true);
    setCurrentPage(1);
    setActiveProducts([]);
  };

  const scrollHandler = () => {
    if (productsRef.current) {
      const elementBoundary = productsRef.current.getBoundingClientRect();
      const bottom = elementBoundary.bottom;
      if (
        typeof window !== 'undefined' &&
        bottom < window.innerHeight &&
        activeProducts.length < totalCount
      ) {
        setFetching(true);
      }
    }
  };

  useEffect(() => {
    const id = localStorage.getItem('activeCategory');
    if (id) {
      setCategoryId(id);
    } else setCategoryId(categories[0]?.id);
  }, []);

  useEffect(() => {
    if (categoryId) {
      let newActiveCategory = categories.find((category) => category?.id === categoryId);
      setActiveCategory(newActiveCategory);
    }
  }, [categoryId]);

  useEffect(() => {
    if (activeCategory?.subcategories) {
      const subId = localStorage.getItem('activeSubCaterogy');
      if (subId) setSubCategoryId(subId);
      // else setSubCategoryId(activeCategory?.subcategories[0].id);
    } else {
      setSubCategoryId(null);
      setLoading(activeCategory?.id);
    }
  }, [activeCategory]);

  useEffect(() => {
    if (subCategoryId) setLoading(subCategoryId);
  }, [subCategoryId]);

  // useEffect(() => {
  //   if (activeProducts ) {
  //     setLoading(false);

  //     const sortArr = sortProductsFunction(
  //       activeProducts,
  //       filterDropdown[0].value,
  //       filterDropdown[0].sort
  //     );
  //     setSortProducts(sortArr);
  //   }
  // }, [activeProducts]);

  const isClientSide = useClientSide();

  const selectHandlerForDropdown = (name) => {
    const thatCategory = categories.find((category) => category.name === name).id;
    setCategoryId(thatCategory);
  };

  const handleSelectCategory = (id) => {
    setCategoryId(id);
    localStorage.setItem('activeCategory', id);
    setCategoryForPagination(id);
  };

  const handleSelectSubcategory = (id) => {
    setSubCategoryId(id);
    setCategoryForPagination(id);
  };

  return (
    <>
      <Section>
        <Wrapper>
          <div className={clsx(s.header, !activeCategory?.subcategories && s.header__sm)}>
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
                    toggleActive={handleSelectSubcategory}
                    additionClass="product"
                  />
                ))}
              </div>
            )}
          </div>

          <div className={clsx(s.filter, !activeCategory?.subcategories && s.filter__sm)}>
            <NewDropdownCustom
              value={filterDropdown[0]?.title}
              options={filterDropdown.map((elem) => elem.title)}
              selectHandler={(e) => {
                filterDropdown.forEach((elem) => {
                  if (elem.title === e.value) {
                    const sortArr = sortProductsFunction(activeProducts, elem.value, elem.sort);
                    setSortProducts([...sortArr]);
                  }
                });
              }}
            />
          </div>

          {isLoading && !activeProducts?.length ? (
            <ProductLoader />
          ) : (
            activeProducts?.length > 0 && (
              <div ref={productsRef} className={s.body}>
                {activeProducts.map((product) => {
                  return (
                    product.status && <Product key={`${product.id}-${product.code}`} {...product} />
                  );
                })}
                {fetching && (
                  <ProductLoader customStyle={{ marginTop: 0, paddingTop: 0, height: '27rem' }} />
                )}
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
