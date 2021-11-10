import React from 'react';
import g from 'styles/Main.module.scss';
import { Wrapper } from 'components/layout/Wrapper/Wrapper';
import { Telegram } from 'components/SVG/ArticleIcons';
import { BASE_SITE_URL } from 'constants.js';
import { telegram } from 'contacts';
import s from './PromoSection.module.scss';

export const PromoSection = ({ image, previewText, detailText }) => (
  <section className={s.promo}>
    {/* image приходит с бека, но дизайнеры захотели разные изображения для мобилки и десктопа */}
    {/* style={{ backgroundImage: `url(${BASE_SITE_URL + image})` }} */}
    <Wrapper style={{ height: '100%' }}>
      <div className={s.container}>
        <span className={s.intro}>{previewText}</span>
        <h1 className={s.title}>{detailText}</h1>
        <div className={s.footer}>
          <a href={telegram} className={s.link}>
            <span>Наш телеграм канал</span>
            {<Telegram />}
          </a>
        </div>
      </div>
    </Wrapper>
  </section>
);
