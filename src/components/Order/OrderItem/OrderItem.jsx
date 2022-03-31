import React from "react";
import clsx from "clsx";
import { Input } from "components/forms/Input/Input";
import { MinusIcon, PlusIcon } from 'components/SVG/Icons';
import s from "components/Order/OrderItem/OrderItem.module.scss";

export const OrderItem = (data) => {
  const { img, name, addition, price, weight, quantity, controls, controlButtons } = data;

  console.log(Number(~~quantity))
  const [numQuantity, setNumQuantity] = React.useState(Number(~~quantity));

  const decNumQuan = () => {
    if(numQuantity > 1) setNumQuantity(prev => --prev)
   }

  const incNumQuan = () => {
    if(numQuantity !== ~~quantity) setNumQuantity(prev => ++prev)
  }

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
      {controlButtons ?
        <div className={s.counter}>
          <button
            type="button"
            className={clsx(s.change, s.minus)}
            onClick={() => decNumQuan()}
          >
            <MinusIcon />
          </button>
          <span className={s.count2}>{numQuantity} шт.</span>
          <button
            type="button"
            className={clsx(s.change, s.plus)}
            onClick={() => incNumQuan()}
          >
            <PlusIcon />
          </button>
        </div>
        :
        <span className={s.count}>{numQuantity} шт.</span>
      }

    </div>
  );
};
