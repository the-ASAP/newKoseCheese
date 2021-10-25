import React from "react";
import { SuccessIcon } from "components/SVG/Icons";
import s from "./ModalSuccess.module.scss";

export const ModalSuccess = () => {
  return (
    <div className={s.container}>
      <SuccessIcon/>
      <h2 className={s.title}>Ваше письмо успешно отправлено!</h2>
      <p className={s.text}>Мы свяжемся с вами и ответим <br/> на ваши вопросы</p>
    </div>
  );
};
