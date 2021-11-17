import React, { useState } from 'react';
import { CloseButton } from 'components/buttons/CloseButton/CloseButton';
import { FormContainer } from 'components/forms/FormContainer/FormContainer';
import { Input } from 'components/forms/Input/Input';
import { Textarea } from 'components/forms/Textarea/Textarea';
import { ModalSuccess } from 'components/modals/ModalSuccess/ModalSuccess';
import { PROFILE_VALIDATION_SCHEMA } from '../../../constants';
import s from './Letter.module.scss';

export const Letter = ({ closeModal }) => {
  const [accept, setAccept] = useState(false);
  const [success, setSuccces] = useState(false);
  const onSubmit = (values) => {
    console.log('123', values);
    setSuccces(true);
    fetch('/api/forms/to-admin/')
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  return (
    <div className={s.container}>
      <div className={s.close}>
        <CloseButton close={closeModal} />
      </div>

      {!success ? (
        <>
          <div className={s.header}>
            <h2 className={s.title}>Письмо</h2>
            <p className={s.desc}>
              Введите свои данные, напишите <br /> комментарий и мы с вами свяжемся
            </p>
          </div>
          <FormContainer
            enableReinitialize
            id="letter"
            initialValues={{ phone: '', name: '', surname: '', email: '', comment: '' }}
            validationSchema={PROFILE_VALIDATION_SCHEMA}
            className="fullWidth"
            onSubmit={onSubmit}
          >
            {() => (
              <>
                <Input label="*Телефон" name="phone" id="phone" type="text" />
                <Input label="*Имя" name="name" id="name" type="text" />
                <Input label="Фамилия" name="surname" id="surname" type="text" />
                <Input label="Е-mail" name="email" id="email" type="text" />
                <Textarea label="Комментарий" name="comment" id="comment" />
                <div className={s.politics}>
                  <Input
                    name="personal"
                    id="personal"
                    type="checkbox"
                    checked={accept}
                    onClick={() => setAccept((prev) => !prev)}
                    additionClass="checkbox"
                  />
                  <span className={s.politicsText}>
                    Я даю согласие на обработку персональных данных и соглашаюсь с&nbsp;
                    <button type="button" className={s.politicsLink}>
                      политикой конфиденциальности.
                    </button>
                  </span>
                </div>
                <button disabled={!accept} type="submit" className={s.submit}>
                  Отправить
                </button>
              </>
            )}
          </FormContainer>
        </>
      ) : (
        <ModalSuccess />
      )}
    </div>
  );
};
