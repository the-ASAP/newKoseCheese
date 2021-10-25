import React from "react";

import clsx from "clsx";
import s from "components/buttons/CloseButton/CloseButton.module.scss";

export const CloseButton = ({ small, close }) => (
  <button type="button" className={clsx(s.close, small && s.closeSmall)} onClick={() => close()}/>
);
