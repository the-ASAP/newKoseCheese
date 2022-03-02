import React from "react";
import s from './ImageSlide.module.scss';

export const ImageSlide = (props) => {
  const url = Object.values(props).join('')
  return (
    <img className={s.item} src={url} alt=""/>
  );
}
