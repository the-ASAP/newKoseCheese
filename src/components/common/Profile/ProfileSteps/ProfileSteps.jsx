import React from "react";
import s from "components/common/Profile/ProfileSteps/ProfileSteps.module.scss";

export const ProfileSteps = () => (
  <div className={s.steps}>
    <div className={s.step}>
      <span className={s.number}/>
      <span className={s.text}>Заполните форму заявление</span>
    </div>
    <div className={s.step}>
      <span className={s.number}/>
      <span className={s.text}>Верните товар курьеру или на точку продаж</span>
    </div>
    <div className={s.step}>
      <span className={s.number}/>
      <span className={s.text}>Получите деньги или товар</span>
    </div>
  </div>
);

