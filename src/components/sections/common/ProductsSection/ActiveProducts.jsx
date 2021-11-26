// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Product } from 'components/Product/Product';
import s from './ProductsSection.module.scss';
import APIBitrix from 'api/APIBitrix';

const ActiveProducts = ({ activeCategory, activeSubcategoryId }) => {
  const [activeProducts, setActiveProducts] = useState([]);
  const id = activeCategory?.subcategories ? activeSubcategoryId : activeCategory?.id;

  useEffect(async () => {
    console.log(id);
    const res = await APIBitrix.get(`products/collection/${id}`);
    setActiveProducts(res);
  }, []);

  return (
    <div className={s.body}>
      {activeProducts && activeProducts.map((product) => <Product key={product.id} {...product} />)}
    </div>
  );
};

export default ActiveProducts;
