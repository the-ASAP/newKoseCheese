import React from "react";
import s from "./Error.module.scss";

export const ErrorPopup = ({text}) => {
  return (
    <div>
      <p>{text}</p>
    </div>
  );
};