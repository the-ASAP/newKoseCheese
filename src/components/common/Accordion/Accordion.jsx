import React from "react";
import Collapsible from "react-collapsible";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { letterChangeModalState } from "redux/slices/modals";
import s from "./Accordion.module.scss";


const Accordion = ({ title, children, button, additionClasses = "" }) => {
  const { triggerClass, contentClass } = additionClasses;
  const dispatch = useDispatch();
  const letterModalHandler = () => {
    dispatch(letterChangeModalState(true));
  };

  return (
    <div className={s.tab}>
      <Collapsible
        triggerClassName={clsx(s.trigger, s[triggerClass])}
        triggerOpenedClassName={clsx(s.trigger, s[triggerClass], s.trigger_open)}
        triggerTagName={"h3"}
        contentInnerClassName={clsx(s.content, s[contentClass])}
        trigger={title}
        transitionTime={300}
      >
        {children}
        {button && <button type={"button"} className={s.button} onClick={letterModalHandler}>Отправить заявку</button>}
      </Collapsible>
    </div>
  );
};

export default Accordion;
