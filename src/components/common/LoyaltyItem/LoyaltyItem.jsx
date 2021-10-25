import React from "react";
import s from "./LoyaltyItem.module.scss";

export const LoyaltyItem = ({children}) => {
  return (
    <div className={s.container}>
      <div className={s.content}>{children}</div>
      <button type="button" className={s.button}>Узнать у менеджера</button>
    </div>
  );
};

