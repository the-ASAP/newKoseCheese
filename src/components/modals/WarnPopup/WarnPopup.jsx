import React from "react";
import { useDispatch } from "react-redux";
import { popUpChangeModalState } from "redux/slices/modals";
import parse from 'html-react-parser';
import s from "./WarnPopup.module.scss";

export const WarnPopup = ({ text }) => {
  const dispatch = useDispatch();

  const popupCloseHandler = () => {
    dispatch(popUpChangeModalState({
      visible: false,
      text: '',
    }));
  };

  return (
    <div className={s.container}>
      <div className={s.text}>{parse(text)}</div>
      <button type="button" className={s.ok} onClick={popupCloseHandler}>OK</button>
    </div>
  );
};