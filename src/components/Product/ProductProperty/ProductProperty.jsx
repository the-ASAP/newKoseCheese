import React from "react";
import s from "components/Product/ProductProperty/ProductProperty.module.scss";

export const ProductProperty = ({title, value}) => {
  return (
    <div className={s.field}>
      <span className={s.label}>{title}:</span>
      <span className={s.value}>{value}</span>
    </div>
  );
};

