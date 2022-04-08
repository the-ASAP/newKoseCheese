import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { Input } from "components/forms/Input/Input";
import { MinusIcon, PlusIcon } from 'components/SVG/Icons';

import s from "components/Order/OrderItem/OrderItem.module.scss";

export const OrderItem = (data) => {
  const { id, img, name, addition, price, weight, quantity, controls, controlButtons, setReturnProducts } = data;

  const [numQuantity, setNumQuantity] = React.useState(Number(~~quantity));

  const decNumQuan = () => {
    if (numQuantity > 1 && setReturnProducts) {
      setNumQuantity(prev => --prev)
      setReturnProducts(prev => prev.map(product => {
        if(product.id === id) product.quantity = numQuantity
        return product
      }))
    }
   }

  const incNumQuan = () => {
    if (numQuantity !== ~~quantity && setReturnProducts) {
      setNumQuantity(prev => ++prev)
      setReturnProducts(prev => prev.map(product => {
        if(product.id === id) product.quantity = numQuantity
        return product
      }))
    }
  }

  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (checked && setReturnProducts) {
      setReturnProducts(prev => [
        ...prev,
        {id, quantity: Number(~~quantity), title: name, addition}
      ])
    }
    if (!checked && setReturnProducts) {
      setReturnProducts(prev => [...prev].filter(item => item.id !== id))
    }
  }, [checked])

  return (
    <div className={clsx(s.container, !controls && s.border)}>
      <div className={clsx(s.info, !controls && s.uncontrol)}>
        {controls &&
          <Input type="checkbox"
            additionClass="checkbox"
            containerClass="order"
            name={`${name} ${addition}`}
            id={`${name} ${addition}`}
            checked={checked}
            onClick={() => setChecked(prev => !prev)}
          />}
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
