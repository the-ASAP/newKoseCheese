import React from "react";
import { useDispatch } from "react-redux";
import { subscribeChangeModalState } from "redux/slices/modals";
import s from "./SubscribeControls.module.scss";

export const SubscribeControls = () => {
  const dispatch = useDispatch();
  const subscribeModalOpenHandler = () => {
    dispatch(subscribeChangeModalState(true));
  };

  return (
    <div className={s.container}>
      <button type="button" className={s.cancel}>Отменить подписку</button>
      <button type="button" className={s.change} onClick={subscribeModalOpenHandler}>Изменить условия</button>
    </div>
  );
};
