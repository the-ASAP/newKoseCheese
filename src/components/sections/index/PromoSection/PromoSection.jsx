// @ts-nocheck
import React, {useState, useEffect} from 'react';
import { Wrapper } from 'components/layout/Wrapper/Wrapper';
import s from './PromoSection.module.scss';

export const PromoSection = ({ image, previewText, detailText, categories }) => {
  return (
    <section className={s.promo}>
      <Wrapper style={{ height: '100%' }}>
        <div className={s.container}>
          <span className={s.intro}>{previewText}</span>
          <h1 className={s.title}>{detailText}</h1>
        </div>
      </Wrapper>
    </section>
  );
}

