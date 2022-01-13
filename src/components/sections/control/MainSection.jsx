import React from 'react'
import { Section } from "components/layout/Section/Section";
import { Wrapper } from "components/layout/Wrapper/Wrapper";
import { H1 } from "components/layout/H1/H1";
import promoImage from "/static/img/control.png"

import s from './MainSection.module.scss'

export const MainSection = () => {
    return (
        <Section>
        <Wrapper>
            <H1>Контроль качества</H1>
            <img src={promoImage} className={s.promo} alt=""/>
        </Wrapper>
      </Section>
    )
}

