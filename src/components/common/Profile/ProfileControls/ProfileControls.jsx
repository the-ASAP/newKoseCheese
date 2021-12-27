import React from "react";
import { FormContainer } from "components/forms/FormContainer/FormContainer";
import { Input } from "components/forms/Input/Input";
import { NewInput } from "components/forms/Input/NewInput";
import clsx from "clsx";
import s from "components/common/Profile/ProfileControls/ProfileControls.module.scss";
import { useTabs } from "hooks";
import { useDispatch, useSelector } from "react-redux";
import { changeDate, getNewHistory, changeStatus, historyAttrItemsSelector } from 'redux/slices/historyAttr'


const buttonFilters = [{
  text: "Все",
  url: "/",
  status: "all",
  id: 0
}, {
  text: "Активные",
  url: "/",
  status: "active",
  id: 1
}, {
  text: "Завершенные",
  url: "/",
  status: "completed",
  id: 2
}];

export const ProfileControls = () => {
  const dispatch = useDispatch()
  const history = useSelector(historyAttrItemsSelector)
  const { activeId, toggleActiveId } = useTabs(0, null);

  const handleFilter = async (id, status) => {
    toggleActiveId(id);
    dispatch(changeStatus(status))
  };

  const [startDate, setStartDate] = React.useState('')
  const [endDate, setEndDate] = React.useState('')

  const newFilterHistory = () => {
    let date_from = startDate.replace(/-/g, '.').split('.').reverse().join('.')
    let date_to = endDate.replace(/-/g, '.').split('.').reverse().join('.')
    dispatch(changeDate({date_from, date_to}))
  }

    // @ts-ignore
  React.useEffect(() => dispatch(getNewHistory()), [history.status, history.date_from, history.date_to])

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
                  onClick={() => handleFilter(filter.id, filter.status)}>
                  {filter.text}
                </button>
              )))}
            </div>
            <div className={s.dates}>
              <NewInput 
                id="dateFrom" 
                name="dateFrom" 
                type="date" 
                label="от" 
                containerClass="date"
                additionClass="dateInput" 
                value={startDate} 
                onChange={(e) => setStartDate(e.target.value)}
              />
              <NewInput 
                id="dateTo" 
                name="dateTo" 
                type="date" 
                label="до" 
                containerClass="date"
                additionClass="dateInput" 
                value={endDate} 
                onChange={(e) => setEndDate(e.target.value)}
              />
              <button className={s.submit} type="button" onClick={newFilterHistory}><span>Найти по дате</span></button>
            </div>
          </div>
        }
      </FormContainer>
    </header>
  );
};