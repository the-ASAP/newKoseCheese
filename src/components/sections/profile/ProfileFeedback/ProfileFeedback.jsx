import React from "react";
import { Input } from "components/forms/Input/Input";
import { Textarea } from "components/forms/Textarea/Textarea";
import { FormContainer } from "components/forms/FormContainer/FormContainer";
import { PROFILE_VALIDATION_SCHEMA } from "constants.js";
import { InputPhoto } from "components/forms/InputPhoto/InputPhoto";
import s from "./ProfileFeedback.module.scss";


export const ProfileFeedback = () => {
  const initialValues = {
    phone: +79271024567
  };
  return (
    <>
      <FormContainer initialValues={initialValues} validationScheme={PROFILE_VALIDATION_SCHEMA}>
        {(formProps) => (
          <>
            <div className={s.phone}>
              <Input label="Телефон для обратной связи" type="text" id="phone" name="phone"/>
            </div>
            <Textarea label="Отзыв" id="feedback" name="feedback" additionClass="feedback"/>
            <div className={s.photos}>
              <span className={s.label}>* Добавить фото</span>
              <div className={s.attached}>
                <InputPhoto name="photo1" id="photo1" formProps={formProps}/>
                <InputPhoto name="photo2" id="photo2" formProps={formProps}/>
                <InputPhoto name="photo3" id="photo3" formProps={formProps}/>
              </div>
            </div>
            <button type="submit" className={s.submit}>Отправить</button>
          </>
        )}
      </FormContainer>
    </>
  );
};

