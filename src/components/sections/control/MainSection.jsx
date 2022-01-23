import React from 'react'
import { Section } from "components/layout/Section/Section";
import { Wrapper } from "components/layout/Wrapper/Wrapper";
import { H1 } from "components/layout/H1/H1";
import { FarmContentLargeSection } from 'components/sections/farm/FarmContentLargeSection/FarmContentLargeSection';
import { FarmContentSmallSection } from 'components/sections/farm/FarmContentSmallSection/FarmContentSmallSection';
import { GallerySection } from 'components/sections/farm/GallerySection/GallerySection';
import { Quote } from './Quote/Quote'

import s from './MainSection.module.scss'

const LargeSection = {
    contentLarge: {
        image: '/static/img/control1.png',
        title: 'Наш сыр мы делаем полностью вручную: от добавления закваски и ферментов, вынашивания сырного зерна, формования, посола — до упаковки сыра.',
        text: 'Сыроделы «Ko&Co» тщательно следят за особенностями развития сыра, ведь каждая партия требует отношения и заботы, а конечный результат определяется искусством сыродела.'
    }
}

const LargeSection2 = {
    contentLarge: {
        image: '/static/img/control4.png',
        title: 'Все молочные продукты Ко&Co сделаны только из свежего цельного молока, без добавления консервантов и искусственных добавок',
        text: 'В основе производства — «живое» молоко наших племенных альпийских коз, они дают сыропригодное молоко. Мы не сепарируем его, не нормализуем сухим молоком, не вносим загустителей и используем щадящую пастеризацию.'
    }
}

const SmallSection = {
    contentSmallItems: [
        {
            title: 'Безупречная свежесть',
            image: '/static/img/control3.png',
            text: 'Мы сами доставляем молочные продукты вам домой с соблюдением температурного режима. Гарантируем безупречную свежесть — 2 дня от созревания сыра на нашей ферме до вашего стола'
        },
        {
            title: 'Отменное качество',
            image: '/static/img/control2.png',
            text: 'Полный цикл производства — все продукты Ко&Co производятся на одной ферме. Мы контролируем качество на всей цепочке: от выращивания кормов в поле и производства молока, — до доставки продуктов к вам домой'
        },
    ]
}

const LastSection = {
    contentLarge: {
        image: '/static/img/control5.png',
        title: 'Возрождение культуры потребления настоящих живых молочных продуктов',
        text: `Французские фермеры готовят такой сыр уже на протяжении нескольких веков, а у нас эта технология была утеряна. Изучив производство козьих сыров на лучших фермах Франции мы перенесли их опыт и знания в Россию.
        
        Изысканность традиции, прежняя культура потребления молочных продуктов и сыров с благородной плесенью вновь возрождаются в России`
    }
}

const QuoteInfo = {
    text: 'Производство живых молочных продуктов – это возрождение традиционных технологий ручного производства в сочетании с высокими технологиями контроля качества',
    author: 'Игошин Юрий Сергеевич',
    position: 'Основатель «Ko&Co»'
}

export const MainSection = ({farm}) => {
    return (
        <Section>
            <Wrapper>
                <H1 additionClass={"control"}>Контроль качества</H1>
                <img src={"/static/img/control.png"} className={s.promo} alt=""/>
                <Quote info={QuoteInfo}/>
                <FarmContentLargeSection pageData={LargeSection}/>
                <FarmContentSmallSection pageData={SmallSection} firstItem="right" />
                <FarmContentLargeSection pageData={LargeSection2} orientation='right'/>
                {farm.gallery && <GallerySection pageData={farm} />}
                <FarmContentLargeSection pageData={LastSection}/>
            </Wrapper>
        </Section>
    )
}

