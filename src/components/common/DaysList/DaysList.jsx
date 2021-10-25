import React from "react";
import clsx from "clsx";
import { ArrowIcon, CheckIcon } from "components/SVG/Icons";
import { stringFromArray, useOutsideClicker } from "functions.js";
import { Field } from "formik";
import s from "components/common/DaysList/DaysList.module.scss";

const days = [{
  title: "Понедельник",
  index: 0
}, {
  title: "Вторник",
  index: 1
}, {
  title: "Среда",
  index: 2
}, {
  title: "Четверг",
  index: 3
}, {
  title: "Пятница",
  index: 4
}, {
  title: "Суббота",
  index: 5
}, {
  title: "Воскресенье",
  index: 6
}];


export const DaysList = () => {

  const [openList, setOpenList] = React.useState(false);

  const [dayValue, setDayValue] = React.useState([]);

  const wrapperRef = React.useRef(null);
  useOutsideClicker(wrapperRef, setOpenList);

  const listHandler = () => {
    setOpenList(!openList);
  };

  const dayHandler = (day) => {
    const updatedDays = [...dayValue];
    if (!updatedDays.some((el => el.title === day.title))) {
      updatedDays.push(day);
      setDayValue(updatedDays.sort((a, b) => a.index - b.index));
    } else {
      setDayValue(updatedDays.filter((el) => el.title !== day.title));
    }
  };

  const values = React.useRef(null);

  React.useEffect(() => {
    values.current.setFieldValue("days", stringFromArray(dayValue, "title"), false);
  }, [dayValue]);


  return (
    <div className={s.wrapper}>
      <div className={s.container} ref={wrapperRef}>
        <Field name="days" value={dayValue}>
          {({
              field, // { name, value, onChange, onBlur }
              form // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
            }) => {
            values.current = form;
            return (
              <>
                <div className={clsx(s.header, openList && s.open)} onClick={listHandler}>
                  <input type="hidden" id="days" {...field}/>
                  <span
                    className={s.value}>{dayValue.length ? stringFromArray(dayValue, "title") : "Дни доставки"}</span>
                  <ArrowIcon/>
                </div>
                <div className={clsx(s.body, openList ? s.open : s.default)}>
                  {
                    days.map(day =>
                      <button type="button"
                              key={day.index}
                              className={s.day}
                              onClick={() => dayHandler(day)}>
                        <span>{day.title}</span>
                        {dayValue.some((el) => el.title === day.title) && <span className={s.checked}><CheckIcon/></span>}
                      </button>)
                  }
                </div>
              </>
            );
          }
          }
        </Field>
      </div>
    </div>
   )
    ;
};
;
;
