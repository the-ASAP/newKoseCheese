import React from "react";
import { Field } from "formik";
import InputMask from "react-input-mask";
import s from "./InputPhone.module.scss";
import clsx from "clsx";

export const InputPhone = ({ label, id, name, disabled }) => {
  console.log();
  return (
    <Field name={name} type="text">
      {({
          field, // { name, value, onChange, onBlur }
          form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
          meta
        }) => (
        <div className={s.container}>
          {
            label && <label className={s.label} htmlFor={id}>{label}</label>
          }
          <InputMask mask="+7 999 999 99 99"
                     alwaysShowMask
                     maskChar=""
                     onBlur={field.onBlur}
                     onChange={field.onChange}
                     value={field.value}
                     className={clsx(s.field, disabled && s.disabled)}
                     tabIndex={disabled && -1}
                     {...field}/>
          {meta.error && (
            <div className={s.error}>{meta.error}</div>
          )}
        </div>
      )
      }
    </Field>
  );
};

