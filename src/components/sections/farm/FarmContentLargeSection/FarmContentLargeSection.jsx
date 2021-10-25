import React from "react";
import { Section } from "components/layout/Section/Section";
import { Wrapper } from "components/layout/Wrapper/Wrapper";
import s from "components/sections/farm/FarmContentLargeSection/FarmContentLargeSection.module.scss";

export const FarmContentLargeSection = ({ pageData }) => {
  const { contentLarge: { image, title, text } } = pageData;
  return (
    <Section>
      <Wrapper>
        <div className={s.container}>
          <img src={image} className={s.image} alt=""/>
          <div className={s.content}>
            <h2 className={s.title}>{title}</h2>
            <p className={s.text}>{text}</p>
          </div>
        </div>
      </Wrapper>
    </Section>
  );
};



