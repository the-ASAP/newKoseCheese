import React from "react";
import { RepeatIcon, ReplaceIcon } from "components/SVG/Icons";
import { addOrderToReturn } from "redux/slices/returnOrder";
import { useDispatch } from "react-redux";
import s from "components/Order/OrderControls/OrderControls.module.scss";


export const OrderControls = ({ formProps, order }) => {

  const dispatch = useDispatch();

  const returnOrderHandler = () => {
    dispatch(addOrderToReturn(order));
  }

  return (
    <>
      <button type="button" className={s.more}>показать еще +</button>
      <div className={s.controls}>
        <button type="button" className={s.repeat}>
          <RepeatIcon/>
          <span>Повторить заказ</span>
        </button>
        <button type="button" onClick={returnOrderHandler} className={s.return}>
          <ReplaceIcon/>
          <span>Заменить товар</span>
        </button>
        <button type="button" onClick={() => formProps.handleSubmit(alert(formProps.values))}
                className={s.remove}>Удалить товар
        </button>
      </div>
    </>
  );
};

