import React from "react";
import { TotalPrice } from "components/common/TotalPrice/TotalPrice";
import { useDispatch, useSelector } from "react-redux";
import { totalPriceSelector } from "redux/slices/cart";
import { closeAllModals } from "redux/slices/modals";
import Link from "next/link";
import s from "./ModalFooter.module.scss";
import APIBitrix from "api/APIBitrix";

export const ModalFooter = () => {
  const totalPrice = useSelector(totalPriceSelector);
  const dispatch = useDispatch();
  return (
    <div className={s.container}>
      <span className={s.cost}>сумма: {totalPrice} руб.</span>
      {/* <span className={s.discount}>скидка: 135 руб.</span> */}
      <TotalPrice value={totalPrice}/>
      <Link href="/purchase">
        <a onClick={() => dispatch(closeAllModals())} className={s.checkout}>
          Оформить заказ
        </a>
      </Link>
      {/*<button type="button" onClick={async () => {*/}
      {/*  await APIBitrix.post("basket/order/", {*/}
      {/*    fuser_id: localStorage.getItem("fuser_id")*/}
      {/*  });*/}
      {/*  alert('Заказ успешно оформлен');*/}
      {/*}} className={s.checkout}>*/}
      {/*  Оформить заказ*/}
      {/*</button>*/}
    </div>
  );
};

