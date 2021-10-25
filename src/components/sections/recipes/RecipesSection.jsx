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

  const { id: categoryId, subcategories: subCategoryId } = categories[0];
  const { activeId: activeCategoryId, toggleActiveId: toggleCategoryId } = useTabs(categoryId, false);
  const { activeId: activeSubCategoryId, toggleActiveId: toggleSubCategoryId } = useTabs(subCategoryId[0].id, false);

  const [isLoading, setLoading] = React.useState(false);

  const [activeCategory, setActiveCategory] = React.useState(categories[0]);
  const [activePosts, setActivePosts] = React.useState(items);

  React.useEffect(() => {
    setActiveCategory(categories.find(category => category.id === activeCategoryId));
  }, [activeCategoryId]);


  React.useEffect(() => {
    toggleSubCategoryId(activeCategory.subcategories ? activeCategory.subcategories[0].id : activeCategory.id);
  }, [activeCategory]);

  React.useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      const posts = await APIBitrix.get(`articles/collection/${activeSubCategoryId}`);
      setActivePosts(posts);
      setLoading(false);
    };

    getPosts();

  }, [activeSubCategoryId]);


  return (
    <>
      <Tabs>
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
      </div>
      <div className={s.posts}>
        {isLoading ?
          <RecipeLoader/>
          :
          activePosts.length > 0 &&
          activePosts.map((post, i) =>
            <Recipe
              key={i}
              isPreview {...post} />)
        }
      </div>
    </>
  );
};



