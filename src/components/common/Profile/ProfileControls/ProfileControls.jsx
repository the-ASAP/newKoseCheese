import React from "react";
import { FormContainer } from "components/forms/FormContainer/FormContainer";
import { Input } from "components/forms/Input/Input";
import clsx from "clsx";
import s from "components/common/Profile/ProfileControls/ProfileControls.module.scss";
import { useTabs } from "hooks";


const buttonFilters = [{
  text: "Все",
  url: "/",
  id: 0
}, {
  text: "Активные",
  url: "/",
  id: 1
}, {
  text: "Завершенные",
  url: "/",
  id: 2
}];

export const ProfileControls = () => {

  const { activeId, toggleActiveId } = useTabs(0, null);

  const handleFilter = (id) => {
    toggleActiveId(id);
  };

  return (
    <header className={s.header}>
      <FormContainer
        enableReinitialize
        className="fullWidth">
        {() =>
          <div className={s.wrapper}>
            <div className={s.tabs}>
              {buttonFilters.map((filter => (
                <button
                  type="button"
                  key={filter.id}
                  className={clsx(s.tab, activeId === filter.id && s.active)}
                  onClick={() => handleFilter(filter.id)}>
                  {filter.text}
                </button>
              )))}
            </div>
            <div className={s.dates}>
              <Input id="dateFrom" name="dateFrom" type="date" label="от" containerClass="date"
                     additionClass="dateInput"/>
              <Input id="dateTo" name="dateTo" type="date" label="до" containerClass="date" additionClass="dateInput"/>
              <button className={s.submit} type="submit"><span>Найти по дате</span></button>
            </div>
          </div>
        }
      </FormContainer>
    </header>
  );
};