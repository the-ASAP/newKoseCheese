// @ts-nocheck
import React, {useState, useEffect} from 'react';
import { Wrapper } from 'components/layout/Wrapper/Wrapper';
import { NewTabs } from 'components/layout/Tabs/NewTabs';
import { NewSubcategoryButton } from 'components/buttons/SubcategoryButton/NewSubcategoryButton';
import { useClientSide } from 'hooks.js';
import { windowSize } from 'constants.js';
import s from './PromoSection.module.scss';

export const PromoSection = ({ image, previewText, detailText, categories }) => {
  // const [useShowButtonId, setUseShowButtonId] = useState(null)
  // const isClientSide = useClientSide();

  // const onMouseEnter = (id) => {
  //   setUseShowButtonId(id)
  // }

  // useEffect(() => {
  //   window.addEventListener('click', () => setUseShowButtonId(null))

  //   return window.removeEventListener('click', () => setUseShowButtonId(null))
  // }, [])

  return (
    <section className={s.promo}>
      <Wrapper style={{ height: '100%' }}>
          {/* {isClientSide && windowSize >= 1200 && 
            <NewTabs>
              {categories.map(({ name, id, subcategories }) => (
                <NewSubcategoryButton
                  key={id}
                  title={name}
                  id={id}
                  subcategories={subcategories}
                  showButtonId={useShowButtonId}
                  onMouseEnter={() => onMouseEnter(id)}
                />
              ))}
            </NewTabs>} */}
        <div className={s.container}>
          <span className={s.intro}>{previewText}</span>
          <h1 className={s.title}>{detailText}</h1>
        </div>
      </Wrapper>
    </section>
  );
}

