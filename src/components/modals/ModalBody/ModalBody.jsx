import React from "react";

import { CloseButton } from "components/buttons/CloseButton/CloseButton";
import s from "./ModalBody.module.scss";

export const ModalBody = ({ closeModal, title, children }) => (
  <>
    <div className={s.header}>
      <h2 className={s.title}>{title}</h2>
      <CloseButton close={closeModal}/>
    </div>
    {children}
  </>
);

