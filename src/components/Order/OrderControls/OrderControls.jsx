// @ts-nocheck
import React from "react";
import { RepeatIcon, ReplaceIcon } from "components/SVG/Icons";
import { useDispatch } from "react-redux";
import s from "components/Order/OrderControls/OrderControls.module.scss";
import { reqAddToCart, reqAddManyCart} from 'redux/slices/cart';
import { cartChangeModalState } from 'redux/slices/modals';

export const OrderControls = ({ formProps, order }) => {
  const dispatch = useDispatch();

  const returnOrderHandler = () => {
    // order.products.map(item => dispatch(reqAddToCart(item)))
    // dispatch(cartChangeModalState(true))

    const submitValues = order.products.map(item => ({ id: item.id, quantity: Number(item.quantity) }))
    dispatch(reqAddManyCart(submitValues))
  }

  return (
    <>
      {/* <button type="button" className={s.more}>показать еще +</button> */}
      <div className={s.controls}>
        <button type="button" className={s.repeat} onClick={returnOrderHandler}>
          <RepeatIcon/>
          <span>Повторить заказ</span>
        </button>
        {/* <button type="button" onClick={returnOrderHandler} className={s.return}>
          <ReplaceIcon/>
          <span>Заменить товар</span>
        </button> */}
        {/* <button type="button" onClick={() => formProps.handleSubmit(alert(formProps.values))}
                className={s.remove}>Удалить товар
        </button> */}
      </div>
    </>
  );
};
