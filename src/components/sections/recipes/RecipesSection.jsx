import React from "react";

import { Tabs } from "components/layout/Tabs/Tabs";
import { TabButton } from "components/buttons/TabButton/TabButton";
import { SubcategoryButton } from "components/buttons/SubcategoryButton/SubcategoryButton";
import { Recipe } from "components/common/Recipe/Recipe";

import { useTabs } from "hooks";

import APIBitrix from "api/APIBitrix";
import { RecipeLoader } from "components/common/RecipeLoader/RecipeLoader";
import s from "./RecipesSection.module.scss";

export const RecipesSection = ({ categories, items }) => {
  const [isLoading, setLoading] = React.useState(false);
  const [activePosts, setActivePosts] = React.useState(items);


  return (
    <>
      {/* <Tabs>
        {categories.map(({ name, id }) => (
          <TabButton
            key={id}
            index={id}
            text={name}
            active={activeCategoryId}
            toggleActive={toggleCategoryId}
          />
        ))}
      </Tabs>
      <div className={s.subcategories}>
        {
          activeCategory.subcategories && activeCategory.subcategories.map(({ name, id }) =>
            <SubcategoryButton
              key={id}
              title={name}
              id={id}
              active={activeSubCategoryId}
              toggleActive={toggleSubCategoryId}/>)
        }
      </div> */}
      <div className={s.posts}>
        {isLoading ?
          <RecipeLoader/>
          :
          activePosts?.map((post, i) =>
            <Recipe
              key={i}
              isPreview {...post} />)
        }
      </div>
    </>
  );
};



