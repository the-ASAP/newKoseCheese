import React from "react";
import s from "components/Order/OrderHeader/OrderHeader.module.scss";
import { format } from 'date-fns'
import clsx from "clsx";

export const OrderHeader = ({data}) => {

  return (
    <div className={s.wrapper}>
      <div className={s.row}>
        <div className={s.field}>
          <span className={s.label}>Номер заказа:</span>
          {" "}
          <span className={s.value}>{data.id}</span>
        </div>
        <div className={clsx(s.field, s.fieldShort)}>
          <span className={s.label}>Цена:</span>
          {" "}
          <span className={s.value}>{~~data.price} руб.</span>
        </div>
        <div className={s.field}>
          <span className={s.label}>Товаров:</span>
          {" "}
          <span className={s.value}>{data.count} шт.</span>
        </div>
        <div className={clsx(s.field, s.fieldShort)}>
          <span className={s.label}>Статус:</span>
          {" "}
          <span className={s.value}>{data.status}</span>
        </div>
        <div className={s.field}>
          <span className={s.label}>Дата:</span>
          {" "}
          <span className={s.value}>{format(data.date, "dd.MM.yyyy")}</span>
        </div>
      </div>
      {/* <span className={s.details}>Детали заказа</span> */}
      {/* <button type="button" className={s.close}/> */}
    </div>
  );
};

