import React from 'react';
import { Field } from 'formik';
import clsx from 'clsx';
import s from 'components/forms/Input/Input.module.scss';

export const NewInput = (props) => {
  const {
    label,
    type,
    id,
    name,
    additionClass = '',
    containerClass = '',
    value = '',
    autoFocus,
    userAddress,
    onChange,
    ...other
  } = props;
  const fieldProps = {
    name,
    type,
    ...(value && { value })
  };

  return (
    <Field {...fieldProps}>
      {({
        field, // { name, value, onChange, onBlur }
        form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        meta
      }) => {
        // if (cityBool) console.log(id);
        return (
          <div className={clsx(s[containerClass], label && s.container)}>
            {label && (
              <label className={s.label} htmlFor={id}>
                {label}
              </label>
            )}
            <input
              autoFocus={!!autoFocus}
              id={id}
              className={clsx(s.field, s[additionClass])}
              type={type}
              // onBlur={field.onBlur}
              {...other}
              {...field}
              onChange={onChange}
              value={value}
            />
            {meta.error && <div className={s.error}>{meta.error}</div>}
          </div>
        );
      }}
    </Field>
  );
};
