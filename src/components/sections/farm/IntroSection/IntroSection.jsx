import React from "react";
import { Section } from "components/layout/Section/Section";
import { Wrapper } from "components/layout/Wrapper/Wrapper";
import { Tabs } from "components/layout/Tabs/Tabs";
import { TabButton } from "components/buttons/TabButton/TabButton";
import { useTabs } from "hooks";
import Link from "next/link";
import s from "components/sections/farm/IntroSection/IntroSection.module.scss";
import { H1 } from "components/layout/H1/H1";

export const IntroSection = ({ categories, url, pageData }) => {
  const { promoImage, title } = pageData;
  const { activeId, toggleActiveId } = useTabs(categories.find(category => category.url === url).id, false);

  return (
    <Section>
      <Wrapper>
        <Tabs additionClass="farm">
          {
            // eslint-disable-next-line no-shadow
            categories.map(({ title, id, url }) =>
              <Link href={url} key={id}>
                <a>
                  <TabButton index={id}
                             active={activeId}
                             toggleActive={toggleActiveId}
                             text={title}
                             additionClass="farm"/>
                </a>
              </Link>
            )}
        </Tabs>
        <img src={promoImage} className={s.promo} alt=""/>
        <H1>{title}</H1>
      </Wrapper>
    </Section>
  );
};

