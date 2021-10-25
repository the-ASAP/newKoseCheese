import React from "react";
import Accordion from "components/common/Accordion/Accordion";
import s from './Question.module.scss';

export const Question = ({question, children}) => {
  const additionClass = {
    triggerClass: "main"
  }

  return (
    <Accordion title={question} additionClasses={additionClass}>
      <p className={s.answer}>{children}</p>
    </Accordion>
  );
};

