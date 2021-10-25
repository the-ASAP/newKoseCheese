import React from "react";
import { Section } from "components/layout/Section/Section";
import { Wrapper } from "components/layout/Wrapper/Wrapper";
import { Telegram } from "components/SVG/ArticleIcons";
import s from "components/sections/index/TelegramPromoSection/TelegramPromoSection.module.scss";

export const TelegramPromoSection = ({ url }) => (
  <Section>
    <Wrapper>
      <h2 className={s.title}>Telegram</h2>
      <a href={url} target="_blank" className={s.subscribe} rel="noreferrer">Подписаться на нас</a>
      <a href={url} className={s.icon}>{<Telegram/>}</a>
    </Wrapper>
  </Section>
);

