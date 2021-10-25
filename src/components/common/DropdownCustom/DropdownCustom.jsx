import React from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import s from "./DropdownCustom.module.scss";

export const DropdownCustom = (props) => {
  const { label, placeholder, options, selectHandler, value } = props;
  return (
    <div className={s.container}>
      <span className={s.label}>{label}</span>
      <Dropdown options={options}
                className={s.field}
                controlClassName={s.control}
                menuClassName={s.menu}
                placeholder={placeholder}
                arrowOpen={<span className={s.arrowOpen}/>}
                arrowClosed={<span className={s.arrowClosed}/>}
                value={value}
                onChange={(e) => {
                  selectHandler(e);
                }}/>
    </div>
  );
};