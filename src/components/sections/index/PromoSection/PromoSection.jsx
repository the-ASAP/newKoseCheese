import React from "react";
import g from "styles/Main.module.scss";
import { Wrapper } from "components/layout/Wrapper/Wrapper";
import { Telegram } from "components/SVG/ArticleIcons";
import { BASE_SITE_URL } from "constants.js";
import s from "./PromoSection.module.scss";

export const PromoSection = ({ image, previewText, detailText, link }) => {
  return (
    <section className={s.promo} style={{ backgroundImage: `url(${BASE_SITE_URL + image})` }}>
      <Wrapper style={{ height: "100%" }}>
        <div className={s.container}>
          <span className={s.intro}>{previewText}</span>
          <h1 className={s.title}>
            {detailText}
          </h1>
          <div className={s.footer}>
            <a href={link} className={s.link}>
              <span>Наш телеграм канал</span>
              {<Telegram/>}
            </a>
          </div>
        </div>
      </Wrapper>
    </section>

  )
}