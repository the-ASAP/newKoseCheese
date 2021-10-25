import React from "react";
import { ADDRESS_VALIDATION_SCHEMA } from "constants.js";
import { Input } from "components/forms/Input/Input";
import { Textarea } from "components/forms/Textarea/Textarea";
import { RemoveButton } from "components/buttons/RemoveButton/RemoveButton";
import { FormContainer } from "components/forms/FormContainer/FormContainer";
import s from "./AddressForm.module.scss";

export const AddressForm = ({ initialValues, removeAddressHandler, id }) => {

  const submitHandler = (values) => {
    alert(values);
  };
  
  return (
    <FormContainer
      enableReinitialize
      initialValues={initialValues}
      validationSchema={ADDRESS_VALIDATION_SCHEMA}
      validateOnChange={false}
      validateOnBlur={false}
      submitHandler={submitHandler}>
      {(formProps) => (
        <div className={s.form}>
          <div className={s.column}>
            <Input id={`city_${(new Date).getTime()}`} label="Город" name="city" type="text"/>
            <Input id={`street_${(new Date).getTime()}`} label="Улица" name="street" type="text"/>
            <div className={s.column}>
              <Input id={`house_${(new Date).getTime()}`} label="Дом" name="house" type="text"/>
              <Input id={`floor_${(new Date).getTime()}`} label="Подъезд" name="floor" type="email"/>
            </div>
            <div className={s.column}>
              <Input id={`apartment_${(new Date).getTime()}`} label="Офис/Квартира" name="apartment" type="text"/>
              <Input id={`code_${(new Date).getTime()}`} label="Код" name="code" type="text"/>
            </div>
          </div>
          <div className={s.column}>
            <Textarea id={`comment_${(new Date).getTime()}`} label="Комментарий" name="comment" type="text"/>
          </div>
          <div className={s.controls}>
            <button type="submit" className={s.submit}>сохранить</button>
            <RemoveButton clickHandler={() => removeAddressHandler(formProps, id)}/>
          </div>
        </div>
      )}
    </FormContainer>
  );
};

