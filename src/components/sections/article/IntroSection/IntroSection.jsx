import React from "react";
import parse from "html-react-parser";
import {
  Time, Persons
} from "components/SVG/ArticleIcons";

import { Section } from "components/layout/Section/Section";
import clsx from "clsx";
import { windowSize, BASE_SITE_URL } from "constants.js";
import s from "./IntroSection.module.scss";


export const IntroSection = ({ article }) => {

    const defaults = {
      name: "",
      previewText: "",
      previewImage: "",
      time: "",
      persons: "",
      detailText: ""
    };

    const properties = {
      ...defaults,
      ...article
    };

    const { name, previewText, time, persons, previewImage, detailText } = properties;

    return (
      <Section margin="article">
        <h1 className={s.title}>{name}</h1>
        <p className={s.description}>
          {previewText}
        </p>
        {(time || persons) && <div className={s.info}>
          {time && <div className={s.field}>
          <span className={s.label}>
            Время приготовления
          </span>
            <div className={s.box}>
              <Time/>
              <span className={s.value}>{time}</span>
            </div>
          </div>}
          {persons && <div className={s.field}>
          <span className={s.label}>
            Порция на:
          </span>
            <div className={s.box}>
              <Persons/>
              <span className={s.value}>{persons}</span>
            </div>
          </div>}
        </div>
        }
        <img src={BASE_SITE_URL + previewImage} alt="" className={s.image}/>
        <div className={s.ingredients}>
          <div className={s.content}>
            {parse(detailText)}
          </div>
        </div>
      </Section>
    );
  }
;
