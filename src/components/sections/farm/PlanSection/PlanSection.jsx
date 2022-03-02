import React from "react";
import { Section } from "components/layout/Section/Section";
import { Wrapper } from "components/layout/Wrapper/Wrapper";
import { H1 } from "components/layout/H1/H1";
import parse from "html-react-parser";
import s from "./PlanSection.module.scss";

export const PlanSection = ({ pageData }) => {
  const { name, previewImage } = pageData;
  return (
    <Section>
      <Wrapper>
        <H1>{name}</H1>
      </Wrapper>
      <div className={s.wrapper}>
        <Wrapper>
          <div className={s.container}>
            <img src={previewImage} alt="" className={s.image}/>
          </div>
        </Wrapper>
      </div>
    </Section>
  );
};
