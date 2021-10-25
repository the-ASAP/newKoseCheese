import React from "react";

import { Product } from "components/Product/Product";
import { SubcategoryButton } from "components/buttons/SubcategoryButton/SubcategoryButton";
import { Tabs } from "components/layout/Tabs/Tabs";
import { Section } from "components/layout/Section/Section";
import { Wrapper } from "components/layout/Wrapper/Wrapper";
import { windowSize } from "constants.js";
import { ProductLoader } from "components/Product/ProductLoader/ProductLoader";
import { useClientSide, useTabs } from "hooks.js";

import APIBitrix from "api/APIBitrix";
import { DropdownCustom } from "components/common/DropdownCustom/DropdownCustom";
import s from "./ProductsSection.module.scss";

export const ProductsSection = ({ products, categories }) => {
  const { activeId: activeCategoryId, toggleActiveId: toggleActiveCategoryId } = useTabs(categories[0].id, false);
  const { activeId: activeSubcategoryId, toggleActiveId: toggleSubcategoryId } = useTabs(categories[0].subcategories[0].id, false);

  const [isLoading, setLoading] = React.useState(false);

  const [activeCategory, setActiveCategory] = React.useState(categories[0]);

  const [activeProducts, setActiveProducts] = React.useState(products);

  React.useEffect(() => {
    setActiveCategory(categories.find(({ id }) => id === activeCategoryId));
  }, [activeCategoryId]);

  React.useEffect(() => {
    activeCategory.subcategories && toggleSubcategoryId(activeCategory.subcategories[0].id);
  }, [activeCategory]);

  React.useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const requestId = activeCategory.subcategories ? activeSubcategoryId : activeCategory.id;
      const requestProducts = await APIBitrix.get(`products/collection/${requestId}`);
      setActiveProducts(requestProducts);
      setLoading(false);
    };
    getProducts();
  }, [activeCategory, activeSubcategoryId]);


  const isClientSide = useClientSide();

  const selectHandlerForDropdown = (name) => {
    const thatCategory = categories.find(category => category.name === name).id;
    toggleActiveCategoryId(thatCategory);
  }

  return (
    <Section>
      <Wrapper>
        <div className={s.header}>
          {isClientSide && windowSize >= 1200 ?
            <Tabs>
              {categories.map(({ name, id }) => (
                <SubcategoryButton
                  key={id}
                  title={name}
                  id={id}
                  active={activeCategoryId}
                  toggleActive={toggleActiveCategoryId}
                />
              ))
              }
            </Tabs> :
            <DropdownCustom
              value={categories[0].name}
              options={categories.map(el => el.name)}
              selectHandler={(e) => selectHandlerForDropdown(e.value)}
            />
          }
          {
            activeCategory.subcategories &&
            <div className={s.subcategories}>

              {
                activeCategory.subcategories.map(({ name, id }) => (
                  <SubcategoryButton
                    key={id}
                    id={id}
                    title={name}
                    active={activeSubcategoryId}
                    toggleActive={toggleSubcategoryId}
                    additionClass="product"
                  />
                ))
              }
            </div>
          }
        </div>

        {
          isLoading ?
            <ProductLoader/>
            :
            activeProducts.length > 0 &&
            <div className={s.body}>
              {activeProducts.map((product) => <Product key={product.id} {...product} />)}
            </div>
        }

        {isClientSide && windowSize <= 1200 &&
        <button type="button" className={s.more}>Показать еще <span>(4)</span></button>}
      </Wrapper>
    </Section>

  );
};
