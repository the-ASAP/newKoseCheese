import React from "react";
import clsx from "clsx";
import s from "components/buttons/ProfileButton/ProfileButton.module.scss"

export const ProfileButton = ({ children, active, setActive, id }) => {
  return (
    <button type="button" className={clsx(s.button, active === id && s.active)}
            onClick={() => setActive(id)}>{children}</button>
  );
};