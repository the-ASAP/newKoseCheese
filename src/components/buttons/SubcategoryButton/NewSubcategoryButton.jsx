import React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import s from 'components/buttons/SubcategoryButton/NewSubcategoryButton.module.scss';

export const NewSubcategoryButton = ({
  setShowButtonId,
  title,
  id,
  active,
  additionClass,
  subcategories,
  showButtonId,
  onMouseEnter,
  onMouseMove,
  onMouseLeave,
  onMouseEnterCat,
  onMouseLeaveCat
}) => {
  const history = useRouter();

  const newSetActiveCategory = (id) => {
    localStorage.setItem('activeCategory', id);
    localStorage.removeItem('activeSubCaterogy');
    setShowButtonId(null)
    history.push('/products');
  };

  const newSetActiveSubCategory = (id, subId) => {
    localStorage.setItem('activeCategory', id);
    localStorage.setItem('activeSubCaterogy', subId);
    setShowButtonId(null)
    history.push('/products');
  };

  return (
    <div className={s.wrapper}>
      <button
        type="button"
        className={clsx(s.subcategory, active === id && s.active, s[additionClass])}
        onMouseEnter={onMouseEnter}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onClick={() => newSetActiveCategory(id)}
      >
        {title}
      </button>
      {subcategories && (
        <div
          className={clsx(s.block, showButtonId === id  && s.block_active)}
          onMouseEnter={onMouseEnterCat}
          onMouseLeave={onMouseLeaveCat}
          // onMouseMove={onMouseMoveCat}
        >
          {subcategories?.map((subcategory) => (
            <button
              type="button"
              className={s.block__ref}
              key={subcategory.id}
              onClick={() => newSetActiveSubCategory(id, subcategory.id)}
            >
              {subcategory.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
