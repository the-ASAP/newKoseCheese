import React from "react";
import s from './ImageSlide.module.scss';

export const ImageSlide = ({ url }) => (
  <img className={s.item} src={url} alt=""/>
);

