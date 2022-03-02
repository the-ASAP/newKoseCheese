import React from "react";
import { Section } from "components/layout/Section/Section";
import { Wrapper } from "components/layout/Wrapper/Wrapper";
import s from "components/sections/farm/FarmContentLargeSection/FarmContentLargeSection.module.scss";

export const FarmContentLargeSection = ({ pageData, orientation = "left" }) => {
  const { previewImage, name, previewText } = pageData;
  return (
    <Section>
      <Wrapper>
        {orientation === 'left' ?
          <div className={s.container}>
            <img src={previewImage} className={s.image} alt=""/>
            <div className={s.content}>
              <h2 className={s.title}>{name}</h2>
              <p className={s.text}>{previewText}</p>
            </div>
          </div>
        :
          <div className={s.container}>
            <div className={s.content}>
              <h2 className={s.title}>{name}</h2>
              <p className={s.text}>{name}</p>
            </div>
            <img src={previewImage} className={s.image} alt=""/>
          </div>
        }
      </Wrapper>
    </Section>
  );
};
