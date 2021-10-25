import React from "react";
import { useDispatch } from "react-redux";
import { successPurchasePopupChangeState } from "redux/slices/modals";
import s from "./SuccessPurchase.module.scss";
import Link from "next/link";

export const SuccessPurchase = ({ order, mail }) => {

  const dispatch = useDispatch();

  const popupCloseHandler = () => {
    dispatch(successPurchasePopupChangeState({
      visible: false,
      order: '',
      mail: ''
    }));
  };

  return (
    <div className={s.container}>
      <h2 className={s.title}>Заказ успешно оплачен!</h2>
      <p className={s.order}>Номер вашего заказа: {order} </p>
      <p className={s.purchase}>На почту {mail} было выслано письмо
        с информацией об оплате.
        За ходом выполнения заказа вы можете следить в {" "}
        <Link href="/profile"><a className={s.link}>личном кабинете</a></Link>
      </p>
      <button type="button" className={s.ok} onClick={popupCloseHandler}>Хорошо</button>
    </div>
  );
};