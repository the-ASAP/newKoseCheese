import React from "react";
import Link from "next/link";
import { RedWine, WhiteWine, Vegetables, Fruits } from "components/SVG/TastesSVG/TastesSVG";
import { ControlButtons } from "components/buttons/ControlButtons/ControlButtons";
import { BASE_SITE_URL } from "constants.js";
import s from "./NewTaste.module.scss";

const allTastes = {
  "red-wine": <RedWine key={0}/>,
  "white-wine": <WhiteWine key={1}/>,
  vegetables: <Vegetables key={2}/>,
  fruits: <Fruits key={3}/>
};
const countryFlags = {
  french: "/static/img/icons/french-flag.jpg",
  russian: "/static/img/icons/rus-flag.jpg"
};

export const NewTaste = (props) => {
  const { id, name, addition, previewImage, detailImage, price, weight } = props;
  const productProps = { id, name, addition, previewImage, price, weight, count: 1 };
  return (
    <div className={s.card}>
      <Link href={`products/${id}`}>
        <a className={s.link}/>
      </Link>
      <ControlButtons productProps={productProps}/>
      <div className={s.body}>
        <img src={BASE_SITE_URL + detailImage} alt={name} className={s.image}/>
        <div>
          {/* TODO: SERGEY,  В НОВОМО МАКЕТЕ ЭТОГО НЕТ, ПОТОМ САМ УДАЛИШЬ, ЕСЛИ НЕ НАДО */}
          {/* {!!style && (
              <div className={s.style}>
                <span className={s.country}>{style} style</span>
                <img src={countryFlags[style]} alt={style} className={s.flag} />
              </div>
            )} */}
        </div>
        {/* TODO: SERGEY,  В НОВОМО МАКЕТЕ ЭТОГО НЕТ, ПОТОМ САМ УДАЛИШЬ, ЕСЛИ НЕ НАДО */}
        {/* {!!tastes.length && (
            <div className={s.well}>{tastes.map((taste, i) => allTastes[taste])}</div>
          )} */}
      </div>
      <h3 className={s.name}>{name}</h3>
      <span className={s.addition}>{addition}</span>
    </div>
  );
};


