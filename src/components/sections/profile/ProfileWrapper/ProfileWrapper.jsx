import React from "react";
import s from "./ProfileWrapper.module.scss";

export const ProfileWrapper = ({children}) => {
  return (
    <div className={s.container}>
      {children}
    </div>
  );
};

