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

  let paramsForPagination = {
    limit: 10,
    page: 1,
    sort_value: 'sort',
    sort_type: 'DESC'
  }

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
    if (fetching === true) {
      try {
      console.log(paramsForPagination)
      if (fetching && window) {
        const requestProducts = await APIBitrix.post(`products/collection/all/`, {
          section_id:
            paginationCategory || localStorage.getItem('activeSubCaterogy') || localStorage.getItem('activeCategory') || categories[0]?.id,
          ...paramsForPagination,
        });
        await setTotalCount(requestProducts?.data.count);
        await setActiveProducts((prevState) => [...prevState, ...requestProducts.data.items]);
        localStorage.getItem('scrollToPosition') &&
          (await window.scrollTo({
            top: +localStorage.getItem('scrollToPosition'),
            behavior: 'smooth'
          }));
        // await setCurrentPage((prevState) => prevState + 1);
        paramsForPagination.limit === 10
          ? paramsForPagination.page += 1
          : paramsForPagination.page = paramsForPagination.limit / 10 + 1
        paramsForPagination.limit = 10
        await localStorage.removeItem('scrollToPosition');
      }
      } finally {
        setFetching(false);
      }
    }
  }, [fetching]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);

    return () => document.removeEventListener('scroll', scrollHandler);
  }, [fetching]);

  const setCategoryForPagination = (id) => {
    // обнуляем все данные при выборе новой категории
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
        // если долистали до конца блока и не все продукты загружены, отправлять повторный запрос
        window &&
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
                    // const sortArr = sortProductsFunction(activeProducts, elem.value, elem.sort);
                    // setSortProducts([...sortArr]);
                    console.log(paramsForPagination.limit, paramsForPagination.page)
                    paramsForPagination.limit = paramsForPagination.limit * (paramsForPagination.page - 1)
                    paramsForPagination.page = 1
                    paramsForPagination.sort_value = elem.value
                    paramsForPagination.sort_type = elem.sort
                    setActiveProducts([])
                    setFetching(true)
                  }
                });
              }}
            />
          </div>

          {isLoading && !activeProducts?.length && totalCount !== 0 ? (
            <ProductLoader />
          ) : (
            activeProducts?.length > 0 && (
              <div ref={productsRef} className={s.body}>
                {activeProducts.map((product) => {
                  return (
                    product.status && <Product key={`${product.id}-${product.code}`} {...product} />
                  );
                })}
                {fetching && totalCount !== 0 && (
                  <ProductLoader customStyle={{ marginTop: 0, paddingTop: 0, height: '27rem' }} />
                )}
              </div>
            )
          )}
        </Wrapper>
      </Section>
    </>
  );
};
