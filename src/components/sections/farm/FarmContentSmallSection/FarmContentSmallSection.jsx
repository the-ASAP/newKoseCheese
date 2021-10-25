import React from "react";
import clsx from "clsx";
import { Section } from "components/layout/Section/Section";
import { Wrapper } from "components/layout/Wrapper/Wrapper";
import { FarmContentSmall } from "components/common/FarmContentSmall/FarmContentSmall";
import s from './FarmContentSmallSection.module.scss';

export const FarmContentSmallSection = ({ pageData, firstItem }) => {
  const { contentSmallItems } = pageData;
  return (
    <Section>
      <Wrapper>
        <div className={clsx(s.container, firstItem === "right" ? s.right : s.left)}>
          {contentSmallItems.map((item, i) => <FarmContentSmall key={i} content={item}/>)}
        </div>
      </Wrapper>
    </Section>
  );
};

