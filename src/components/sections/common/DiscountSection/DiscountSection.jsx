import React from "react";
import Link from "next/link";

import { Section } from "components/layout/Section/Section";
import { Wrapper } from "components/layout/Wrapper/Wrapper";
import s from "./DiscountSection.module.scss";

export const DiscountSection = (props) => {
  const { image, offer, category, name, date, id } = props;
  return (
    <Section>
      <Wrapper>
        <div className={s.container}>
          <img className={s.background} src={image} alt={name}/>
          <div className={s.promo}>
            <h3 className={s.before}>Скидка до</h3>
            <span className={s.offer}>{offer}</span>
            <h3 className={s.info}>
              <span className={s.category}>на {category}</span>
              <span className={s.name}> {name}</span>
            </h3>
            <div className={s.date}>До {date}</div>
            <Link href={`/products/${id}`}>
              <a className={s.link}>Посмотреть</a>
            </Link>
          </div>
        </div>
      </Wrapper>
    </Section>
  );
};

