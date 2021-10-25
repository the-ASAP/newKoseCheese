import React from "react";
import { CloseButton } from "components/buttons/CloseButton/CloseButton";
import { FormContainer } from "components/forms/FormContainer/FormContainer";
import { Input } from "components/forms/Input/Input";
import { Textarea } from "components/forms/Textarea/Textarea";
import { PROFILE_VALIDATION_SCHEMA } from "constants";
import { ModalSuccess } from "components/modals/ModalSuccess/ModalSuccess";
import s from "./Letter.module.scss";

const isSuccess = false;
export const Letter = ({ closeModal }) => (
  <div className={s.container}>
    <div className={s.close}>
      <CloseButton close={closeModal}/>
    </div>
    {!isSuccess ? <>
      <div className={s.header}>
        <h2 className={s.title}>Письмо</h2>
        <p className={s.desc}>Введите свои данные, напишите <br/> комментарий и мы с вами свяжемся</p>
      </div>
      <FormContainer enableReinitialize initialValues={{}} validationScheme={PROFILE_VALIDATION_SCHEMA}
                     className="fullWidth">
        {(formProps) => (
          <>
            <Input label="*Телефон" name="phone" id="phone" type="number"/>
            <Input label="*Имя" name="name" id="name" type="text"/>
            <Input label="Фамилия" name="surname" id="surname" type="text"/>
            <Input label="Е-mail" name="e-mail" id="e-mail" type="text"/>
            <Textarea label="Комментарий" name="comment"/>
            <div className={s.politics}>
              <Input name="personal" id="personal" type="checkbox" additionClass="checkbox"/>
              <span className={s.politicsText}>Я даю согласие на обработку персональных данных и соглашаюсь с&nbsp;
                <button type="button" className={s.politicsLink}>политикой конфиденциальности.</button>
              </span>
            </div>
            <button type="submit" className={s.submit}>Отправить</button>
          </>
        )}
      </FormContainer>

    </> : <ModalSuccess/>
    }
  </div>
);

