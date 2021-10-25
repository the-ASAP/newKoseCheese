import React from "react";
import clsx from "clsx";
import { ArrowIcon, CheckIcon } from "components/SVG/Icons";
import { stringFromArray, useOutsideClicker } from "functions.js";
import { Field } from "formik";
import s from "./MultipleDropdown.module.scss";


export const MultipleDropdown = ({ options, pushingHandler }) => {

  const [isOpen, setOpen] = React.useState(false);

  const [selectValue, setSelectValue] = React.useState([]);

  const wrapperRef = React.useRef(null);
  useOutsideClicker(wrapperRef, setOpen);

  const listHandler = () => {
    setOpen(!isOpen);
  };


  const values = React.useRef(null);

  React.useEffect(() => {
    values.current.setFieldValue("days", stringFromArray(selectValue, "title"), false);
  }, [selectValue]);


  return (
    <div className={s.wrapper}>
      <div className={s.container} ref={wrapperRef}>
        <Field name="days" value={selectValue}>
          {({
              field, // { name, value, onChange, onBlur }
              form // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
            }) => {

            values.current = form;

            return (
              <>
                <div className={clsx(s.header, isOpen && s.open)} onClick={listHandler}>
                  <input type="hidden" id="days" {...field}/>
                  <span
                    className={s.value}>{selectValue.length ? stringFromArray(selectValue, "title") : "Дни доставки"}</span>
                  <ArrowIcon/>
                </div>
                <div className={clsx(s.body, isOpen ? s.open : s.default)}>
                  {
                    options.map(option =>
                      <button type="button"
                              key={option.index}
                              className={s.day}
                              onClick={() => pushingHandler(option, selectValue, setSelectValue)}>
                        <span>{option.name}</span>
                        {
                          selectValue.some((el) => el.name === option.name) &&
                          <span className={s.checked}><CheckIcon/></span>
                        }
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
  );
};
