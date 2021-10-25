import React from "react";
import s from "./FarmContentSmall.module.scss";

export const FarmContentSmall = ({ content }) => {
  const { title, image, text } = content;
  return (
    <div className={s.container}>
      {title && <h2 className={s.title}>{title}</h2>}
      <img className={s.image} src={image} alt=""/>
      {text && <p className={s.text}>{text}</p>}
    </div>
  );
};

