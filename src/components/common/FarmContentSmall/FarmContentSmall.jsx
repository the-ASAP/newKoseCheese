import React from "react";
import s from "./FarmContentSmall.module.scss";

export const FarmContentSmall = ({ content }) => {
  const { name, previewImage, previewText } = content;
  return (
    <div className={s.container}>
      {name && <h2 className={s.title}>{name}</h2>}
      {previewImage && <img className={s.image} src={previewImage} alt="" />}
      {previewText && <p className={s.text}>{previewText}</p>}
    </div>
  );
};
