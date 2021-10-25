import React from "react";
import { Field } from "formik";
import clsx from "clsx";
import s from "components/forms/Textarea/Textarea.module.scss";

export const Textarea = (props) => {
  const { label, type, id, name, additionClass = "" } = props;

  return (
    <Field name={name}>
      {({
          field, // { name, value, onChange, onBlur }
          form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
          meta
        }) => (
        <div className={label && s.container}>
          {label && <label className={s.label} htmlFor={id}>{label}</label>}
          <textarea {...field} id={id} className={clsx(s.input, s[additionClass])} type={type} name={name}/>
          {meta.touched && meta.error && (
            <div className="error">{meta.error}</div>
          )}
        </div>
      )}
    </Field>
  );
};
