import React from "react";
import { Input } from "components/forms/Input/Input";
import { FormContainer } from "components/forms/FormContainer/FormContainer";
import { PROFILE_VALIDATION_SCHEMA } from "constants.js";
import APIBitrix from "api/APIBitrix";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo, setUserPhone, userIdSelector, userInfoSelector } from "redux/slices/user";
import { InputPhone } from "components/forms/InputPhone/InputPhone";
import { newPhonePopupChangeState, popUpChangeModalState } from "redux/slices/modals";
import s from "./ProfilePersonal.module.scss";



export const ProfilePersonal = () => {

  const userId = useSelector(userIdSelector);
  const userInfo = useSelector(userInfoSelector);
  const dispatch = useDispatch();

  const setPersonalInfo = async ({ phone, name, surname, email }) => {

    const response = await APIBitrix.post("user/new-personal-data/", {
      user_id: userId,
      name,
      surname,
      email
    });

    await dispatch(setUserInfo({
      phone,
      name,
      surname,
      email
    }));

    await dispatch(popUpChangeModalState({
      visible: true,
      text: "Данные успешно изменены."
    }));
  };

  const callChangePhonePopup = () => {
    dispatch(newPhonePopupChangeState(true));
  };

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <div className={s.form}>
          <FormContainer
            enableReinitialize
            initialValues={userInfo}
            validateOnChange={false}
            validateOnBlur={false}
            validationSchema={PROFILE_VALIDATION_SCHEMA}
            submitHandler={setPersonalInfo}>
            {() => (
              <>
                <InputPhone id="phone" label="* Телефон" name="phone" disabled/>
                <button type="button"
                        onClick={callChangePhonePopup}
                        className={s.changePhone}>
                  Изменить номер телефона
                </button>
                <Input id="name" label="* Имя" name="name" type="text"/>
                <Input id="surname" label="Фамилия" name="surname" type="text"/>
                <Input id="email" label="E-mail" name="email" type="text"/>
                <button type="submit" className={s.submit}>сохранить</button>
              </>
            )}
          </FormContainer>
        </div>
      </div>
    </div>
  );
};

