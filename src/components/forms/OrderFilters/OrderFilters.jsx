import React from "react";
import s from './OrderFilters.module.scss';
import { useTabs } from "hooks";

export const OrderFilters = () => {

  const [activeId, setActiveId, toggleActiveId] = useTabs(0, false);

  return (
    <div className={s.container}>
      <button type="button" className={s.button}>Все</button>
      <button type="button" className={s.button}>Активные</button>
      <button type="button" className={s.button}>Завершенные</button>
    </div>
  );
};
