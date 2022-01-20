import React from "react";
import { Section } from "components/layout/Section/Section";
import { Wrapper } from "components/layout/Wrapper/Wrapper";
import s from "components/sections/farm/FarmContentLargeSection/FarmContentLargeSection.module.scss";

export const FarmContentLargeSection = ({ pageData, orientation = "left" }) => {
  const { contentLarge: { image, title, text } } = pageData;
  return (
    <Section>
      <Wrapper>
        {orientation === 'left' ? 
          <div className={s.container}>
            <img src={image} className={s.image} alt=""/>
            <div className={s.content}>
              <h2 className={s.title}>{title}</h2>
              <p className={s.text}>{text}</p>
            </div>
          </div>
        :
          <div className={s.container}>
            <div className={s.content}>
              <h2 className={s.title}>{title}</h2>
              <p className={s.text}>Использование самой современной щадящей пастеризации, восполнение бактериального баланса за счет французских заквасок, неограниченный срок годности продукции благодаря соблюдению идеальной чистоты. В Европе у людей отстутствуют понятия срока годности при разговоре о фермерском сыре.</p>
            </div>
            <img src={image} className={s.image} alt=""/>
          </div>
        }
      </Wrapper>
    </Section>
  );
};



