import React from "react";

import { BASE_SITE_URL } from "constants.js";
import s from "./Step.module.scss";

export const Step = ({ index, text, image }) => (
  <div className={s.container}>
    <div className={s.info}>
      {/* eslint-disable-next-line no-param-reassign,no-plusplus */}
      <span className={s.step}>Шаг <span className={s.index}>{++index}</span></span>
      <p className={s.text}>{text}</p>
    </div>
    <img className={s.image} src={ BASE_SITE_URL + image} alt={text}/>
  </div>
);
