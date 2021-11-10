import React from 'react';
import { Section } from 'components/layout/Section/Section';
import { Wrapper } from 'components/layout/Wrapper/Wrapper';
import { Telegram } from 'components/SVG/ArticleIcons';
import { telegram } from 'contacts';
import s from 'components/sections/index/TelegramPromoSection/TelegramPromoSection.module.scss';

export const TelegramPromoSection = () => (
  <Section>
    <Wrapper>
      <h2 className={s.title}>Telegram</h2>
      <a href={telegram} target="_blank" className={s.subscribe} rel="noreferrer">
        Подписаться на нас
      </a>
      <a href={telegram} className={s.icon}>
        {<Telegram />}
      </a>
    </Wrapper>
  </Section>
);
