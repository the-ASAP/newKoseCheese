import React from "react";
import s from "./Partner.module.scss";

export const Partner = (props) => {
  return (
    <div className={s.item}>
      <img src={props.url} alt="" className={s.image}/>
    </div>
  );
};

