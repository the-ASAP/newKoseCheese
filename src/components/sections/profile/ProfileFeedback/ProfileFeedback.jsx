import React from "react";
import { Input } from "components/forms/Input/Input";
import { Textarea } from "components/forms/Textarea/Textarea";
import { FormContainer } from "components/forms/FormContainer/FormContainer";
import { PROFILE_VALIDATION_SCHEMA } from "constants.js";
import { InputPhoto } from "components/forms/InputPhoto/InputPhoto";
import { InputPhone } from 'components/forms/InputPhone/InputPhone';
import { popUpChangeModalState } from 'redux/slices/modals';
import { useDispatch } from 'react-redux';

import APIBitrix from 'api/APIBitrix'

import s from "./ProfileFeedback.module.scss";

export const ProfileFeedback = () => {
  const dispatch = useDispatch()

  return (
    <>
      <FormContainer
        initialValues={{}}
        validationScheme={PROFILE_VALIDATION_SCHEMA}
        onSubmit={async (values, { resetForm }) => {
          const submitValues = {
            user_phone: values.user_phone,
            user_comment: values.user_comment,
            images: [values.photo1, values.photo2, values.photo3].filter(Boolean)
          }

          await APIBitrix.post(
            'forms/feedback/',
            submitValues
          ).then((res) => {
            if (res.code === 200) {
              dispatch(popUpChangeModalState({
                visible: true,
                text: res.message
              }))
              resetForm()
            }
            else dispatch(popUpChangeModalState({
              visible: true,
              text: 'Произошла ошибка. Проверьте заполняемую информацию или попробуйте отправить запрос позже.'
            }))
          });
        }}>
        {(formProps) => (
          <>
            <div className={s.phone}>
              <InputPhone label="Телефон для обратной связи" id="phone" name="user_phone"/>
            </div>
            <Textarea label="Отзыв" id="feedback" name="user_comment" additionClass="feedback"/>
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
