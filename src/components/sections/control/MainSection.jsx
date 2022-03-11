import React from 'react'
import { Section } from "components/layout/Section/Section";
import { Wrapper } from "components/layout/Wrapper/Wrapper";
import { H1 } from "components/layout/H1/H1";
import { FarmContentLargeSection } from 'components/sections/farm/FarmContentLargeSection/FarmContentLargeSection';
import { FarmContentSmallSection } from 'components/sections/farm/FarmContentSmallSection/FarmContentSmallSection';
import { GallerySection } from 'components/sections/farm/GallerySection/GallerySection';
import { Quote } from './Quote/Quote'

import s from './MainSection.module.scss'

const QuoteInfo = {
    text: 'Производство живых молочных продуктов – это возрождение традиционных технологий ручного производства в сочетании с высокими технологиями контроля качества',
    author: 'Игошин Юрий Сергеевич',
    position: 'Основатель «Ko&Co»'
}

export const MainSection = ({ content }) => {
    const { section, items } = content

    return (
        <Section>
            <Wrapper>
                <H1 additionClass={"control"}>{section.name}</H1>
                <img src={section.image} className={s.promo} alt=""/>
                <Quote info={QuoteInfo}/>
                <FarmContentLargeSection pageData={items[0]}/>
                <FarmContentSmallSection pageData={[items[1], items[2]]} firstItem="right" />
                <FarmContentLargeSection pageData={items[3]} orientation='right'/>
                <GallerySection pageData={items[4]} />
                <FarmContentLargeSection pageData={items[5]}/>
            </Wrapper>
        </Section>
    )
}
