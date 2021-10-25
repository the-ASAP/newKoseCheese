import React from "react";
import clsx from "clsx";
import s from "components/common/Profile/ProfileBody/ProfileBody.module.scss";

export const ProfileBody = ({ children, title, additionClass }) => (
    <div className={clsx(s.container, s[additionClass])}>
      <h2>{title}</h2>
      {children}
    </div>
  );

