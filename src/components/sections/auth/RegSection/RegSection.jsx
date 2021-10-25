import React from "react";
import { Input } from "components/forms/Input/Input";
import Link from "next/link";
import { FormContainer } from "components/forms/FormContainer/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { privacyChangeModalState } from "redux/slices/modals";
import APIBitrix from "api/APIBitrix";
import { useRouter } from "next/router";
import APIAuth from "api/APIAuth";
import { InputPhone } from "components/forms/InputPhone/InputPhone";
import { AUTH_VALIDATION_SCHEMA } from "constants.js";
import s from "../AuthSection/AuthSection.module.scss";
import { userIdSelector } from "../../../../redux/slices/user";
import { addUserId, setLogged, setUserInfo } from "redux/slices/user";

export const RegSection = () => {

  const dispatch = useDispatch();
  const router = useRouter();

  const [confirmField, setConfirmField] = React.useState(false);
  const [formData, setFormData] = React.useState({});

  const userId = useSelector(userIdSelector);

  const privacyModalHandler = () => {
    dispatch(privacyChangeModalState(true));
  };

  const initialValues = {
    phone: "",
    code: "",
    policy: false
  };
  //
  // const regHandler = (value) => {
  //   const { phone, policy } = JSON.parse(value);
  //   console.log(value);
  //   if (policy) {
  //     APIBitrix.post("user/new-user/", {
  //       phone
  //     }).then(res => {
  //       if (res.user_id) {
  //         setConfirmField(true);
  //         setConfrimData(res);
  //         localStorage.setItem("code", res.code);
  //       } else {
  //         console.log(res);
  //       }
  //     });
  //   } else {
  //     alert("Пожалуйста, ознакомьтесь с политикой конфиденциальности");
  //   }
  // };
  //
  // const confirmHandler = (value) => {
  //   const { user_id } = confirmData;
  //   const { code } = JSON.parse(value);
  //   APIBitrix.post("user/new-user/check/", {
  //     user_id,
  //     code
  //   }).then(res => {
  //     if (JSON.parse(localStorage.getItem("code")) == code) {
  //       console.log(res);
  //       localStorage.setItem("code", "");
  //       router.push("/profile");
  //     } else {
  //       alert("Проверьте правильность кода...");
  //     }
  //
  //   });
  // };


  const regHandler = async ({ phone }) => {
    phone = phone.replace(/\s+/g, "");
    const response = await APIAuth.reg(phone);
    const userInfo = await APIBitrix.post('user/personal-data/', {
      user_id: response.user_id
    });
    await dispatch(setUserInfo(userInfo));
    await setFormData(response);
    setConfirmField(true);
  };

  const confirmHandler = async (userData, verification) => {
    userData = {
      ...userData,
      fuser_id: userId
    };
    await APIAuth.confirm(userData, verification);
    await dispatch(addUserId(userData.user_id));
    localStorage.setItem("fuser_id", userData.user_id);
    await dispatch(setLogged(true));
    router.push("/profile");
    console.log(userData, verification);
  };

  return (
    <div className={s.container}>
      <h2 className={s.title}>Вход</h2>
      <FormContainer
        validationSchema={AUTH_VALIDATION_SCHEMA}
        initialValues={initialValues}
        validateOnChange={false}
        validateOnBlur={false}
        className="loginForm"
        submitHandler={(values) => {
          confirmField ?
            confirmHandler(formData, values) : regHandler(values);
        }
        }
      >
        {() =>
          (
            <>
              {
                !confirmField ?
                  <InputPhone label="Номер телефона" id="phone" name="phone"/>
                  :
                  // <Input id="phone" label="Номер телефона" name="phone" type="text"/>
                  <Input id="code" label="Код подтверждения" name="code" type="text" autoFocus/>
              }
              <div className={s.politics}>
                <Input id="policy" name="policy" type="checkbox" additionClass="checkbox"/>
                <div className={s.label}>
                  <span>Я ознакомлен(-а)</span>
                  <button type="button" className={s.privacy}
                          onClick={privacyModalHandler}>
                    с политикой конфиденциальности
                  </button>
                </div>
              </div>
              <button className={s.submit}
                      type="submit">
                Зарегистрироваться
              </button>
              <Link href="/login">
                <a className={s.reg}>Войти</a>
              </Link>
            </>
          )
        }

      </FormContainer>
    </div>
  );
};
