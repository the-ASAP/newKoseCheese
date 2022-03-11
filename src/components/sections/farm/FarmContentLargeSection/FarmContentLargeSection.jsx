import React from "react";
import { Section } from "components/layout/Section/Section";
import { Wrapper } from "components/layout/Wrapper/Wrapper";
import s from "components/sections/farm/FarmContentLargeSection/FarmContentLargeSection.module.scss";

export const FarmContentLargeSection = ({ pageData, orientation = "left" }) => {
  return (
    <Section>
      <Wrapper>
        {orientation === 'left' ?
          <div className={s.container}>
            {pageData?.previewImage && <img src={pageData.previewImage} className={s.image} alt="" />}
            <div className={s.content}>
              {pageData?.name && <h2 className={s.title}>{pageData.name}</h2>}
              {pageData?.previewText && <p className={s.text}>{pageData.previewText}</p>}
            </div>
          </div>
        :
          <div className={s.container}>
            <div className={s.content}>
              <h2 className={s.title}>{pageData.name}</h2>
              <p className={s.text}>{pageData.name}</p>
            </div>
            <img src={pageData.previewImage} className={s.image} alt=""/>
          </div>
        }
      </Wrapper>
    </Section>
  );
};
