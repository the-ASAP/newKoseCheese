import React from "react";
import { Section } from "components/layout/Section/Section";
import { Wrapper } from "components/layout/Wrapper/Wrapper";
import { Tabs } from "components/layout/Tabs/Tabs";
import { TabButton } from "components/buttons/TabButton/TabButton";
import { useTabs } from "hooks";
import Link from "next/link";
import s from "components/sections/farm/IntroSection/IntroSection.module.scss";
import { H1 } from "components/layout/H1/H1";

export const IntroSection = ({ pageData }) => {
  const { image, description } = pageData;

  return (
    <Section>
      <Wrapper>
        <img src={image} className={s.promo} alt=""/>
        <H1>{description}</H1>
      </Wrapper>
    </Section>
  );
};
