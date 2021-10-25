import React from "react";
import { Section } from "components/layout/Section/Section";
import { Wrapper } from "components/layout/Wrapper/Wrapper";
import { H1 } from "components/layout/H1/H1";
import parse from "html-react-parser";
import s from "./PlanSection.module.scss";

export const PlanSection = ({ pageData }) => {
  const { plan: { image, list } } = pageData;
  return (
    <Section>
      <Wrapper>
        <H1>План фермы</H1>
      </Wrapper>
      <div className={s.wrapper}>
        <Wrapper>
          <div className={s.container}>
            {parse(list)}
            <img src={image} alt="" className={s.image}/>
          </div>
        </Wrapper>
      </div>
    </Section>
  );
};

