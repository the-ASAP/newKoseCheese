import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router'
import s from 'components/buttons/SubcategoryButton/NewSubcategoryButton.module.scss';


export const NewSubcategoryButton = ({ title, id, active, additionClass, subcategories, showButtonId, onMouseEnter }) => {
  const history = useRouter()


  const newSetActiveCategory = (id) => {
    localStorage.setItem('activeCategory', id)
    history.push('/products')
  }

  const newSetActiveSubCategory = (id, subId) => {
    localStorage.setItem('activeCategory', id)
    localStorage.setItem('activeSubCaterogy', subId)
    history.push('/products')
  }


  return (
      <div className={s.wrapper}>
          <button
            type="button"
            className={clsx(s.subcategory, active === id && s.active, s[additionClass])}
            onMouseEnter={onMouseEnter}
            onClick={() => newSetActiveCategory(id)}
          >
          {title}
          </button>
          {subcategories && 
            <div className={clsx(s.block,  showButtonId === id && s.block_active)}>
              {subcategories?.map(subcategory => 
                <button type="button" className={s.block__ref} key={subcategory.id} onClick={() => newSetActiveSubCategory(id, subcategory.id)}>
                  {subcategory.name}
                </button>
              )}   
            </div>
            }       
      </div>  
    );
}
