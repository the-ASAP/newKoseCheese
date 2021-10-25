import React from "react";
import s from "./Partner.module.scss";

export const Partner = ({ logo }) => (
  <span className={s.partner}>{logo}</span>
);
