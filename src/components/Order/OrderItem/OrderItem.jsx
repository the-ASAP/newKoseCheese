import React from "react";
import clsx from "clsx";
import { Input } from "components/forms/Input/Input";
import s from "components/Order/OrderItem/OrderItem.module.scss";

export const OrderItem = (data) => {
  const { img, name, addition, price, weight, quantity, controls } = data;

  return (
    <div className={clsx(s.container, !controls && s.border)}>
      <div className={clsx(s.info, !controls && s.uncontrol)}>
        {controls && <Input type="checkbox"
                            additionClass="checkbox"
                            containerClass="order"
                            name={`${name} ${addition}`}
                            id={`${name} ${addition}`}/>}
        <img src={img} alt={name} className={s.image}/>
        <div className={s.data}>
          <h3 className={s.title}>{name}</h3>
          <div className={s.addition}>{addition}</div>
          <span className={s.price}>{~~price} руб.</span>
          <span className={s.weight}>{weight} г.</span>
        </div>
      </div>
      <span className={s.count}>{~~quantity} шт.</span>
    </div>
  );
};

