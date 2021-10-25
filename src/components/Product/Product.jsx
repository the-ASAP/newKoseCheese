import React from "react";
import clsx from "clsx";
import Link from "next/link";
import { allTastes, BASE_SITE_URL } from "/src/constants.js";
import { ControlButtons } from "components/buttons/ControlButtons/ControlButtons";
import s from "components/Product/Product.module.scss";

export const Product = (props) => {

  const defaults = {
    status: false,
    previewImage: "",
    name: "",
    addition: "",
    weight: "",
    price: 0,
    tastes: [],
    additionClass: "",
    id: null
  };

  const properties = {
    ...defaults,
    ...props
  };

  const cartProductsProps = {
    ...properties, quantity: 1
  };

  const {
    status,
    previewImage,
    name,
    addition,
    weight,
    price,
    tastes,
    additionClass,
    id
  } = properties;

  return (
    <div className={clsx(s.card, additionClass && s[additionClass])}>
      <ControlButtons productProps={cartProductsProps}/>
      <span className={clsx(s.status, status ? s.inStock : s.outStock)}>{status ? "В наличии" : "Нет в наличии"}</span>
      <img height={160} src={BASE_SITE_URL + previewImage} alt={name} className={s.image}/>
      <div className={s.body}>
        <h3 className={s.name}>{name}</h3>
        {
          addition &&
          <span className={s.addition}>{addition}</span>
        }
        <div className={s.info}>
          <div className={s.well}>
            {tastes?.length && tastes.map((taste) => allTastes[taste])}
          </div>
          <span className={s.weight}>{weight} г.</span>
        </div>
        <h3 className={s.price}>{parseInt(price, 10)} руб.</h3>
      </div>
      <Link href={`/products/${id}`}><a className={s.link}/></Link>
    </div>
  );
};

