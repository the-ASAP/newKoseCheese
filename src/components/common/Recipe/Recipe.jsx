import React from "react";
import Link from "next/link";
import clsx from "clsx";
import { BASE_SITE_URL } from "constants.js";
import s from "./Recipe.module.scss";


export const Recipe = ({ previewImage, name, previewText, code, id, isPreview }) => {
  return (
    <div className={clsx(s.card, isPreview && s.preview)}>
      <img src={BASE_SITE_URL + previewImage} alt="" className={s.image}/>
      <h3 className={s.name}>{name}</h3>
      <p className={s.text}>{previewText}</p>
      {code && <Link href={`/articles/${id}`}>
        <a className={s.link}>
          Посмотреть
        </a>
      </Link>}
    </div>
  );

}
