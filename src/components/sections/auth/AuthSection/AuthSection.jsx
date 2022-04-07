import React from 'react';
import { Input } from 'components/forms/Input/Input';
import Link from 'next/link';
import { FormContainer } from 'components/forms/FormContainer/FormContainer';
import { InputPhone } from 'components/forms/InputPhone/InputPhone';
import { useDispatch, useSelector } from 'react-redux';
import { userInfoSelector, setUserInfo, userIdSelector} from 'redux/slices/user';
import { AUTH_VALIDATION_SCHEMA } from 'constants.js';
import APIAuth from 'api/APIAuth';
import { useRouter } from 'next/router';
import APIBitrix from 'api/APIBitrix';
import { privacyChangeModalState } from 'redux/slices/modals';
import s from './AuthSection.module.scss';

export const AuthSection = () => {
  const router = useRouter();
  const isLoginPage = router.pathname === '/login';

  const initialValues = {
    phone: '+7 ',
    code: '',
    policy: isLoginPage
  };

  const [confirmField, setConfirmField] = React.useState(false);
  const [formData, setFormData] = React.useState({});
  const userId = useSelector(userIdSelector);
  const dispatch = useDispatch();

  const regHandler = async ({ phone }) => {
    phone = phone.replace(/\s+/g, '');
    const response = await APIAuth.reg(phone);
    setFormData(response);
    setConfirmField(true);
  };

  const confirmHandler = async (userData, verification) => {
    userData = {
      ...userData,
      fuser_id: userId
    };

    const confirmRequest = await APIAuth.confirm(userData, verification);
    localStorage.setItem('authToken', confirmRequest.token);

    const profileInfo = await APIBitrix.post(
      'user/personal-data/',
      {},
      {
        Authorization: `Bearer ${confirmRequest.token}`
      }
    ).then((res) => {
      const userInfo = res.data
      dispatch(setUserInfo({ ...userInfo, isLogged: true, fuserId: localStorage.getItem('fuser_id') }))
    });

    router.push('/profile');
  };

  const privacyModalHandler = () => {
    dispatch(privacyChangeModalState(true));
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
        onSubmit={(values) => {
          confirmField ? confirmHandler(formData, values) : regHandler(values);
        }}
      >
        {() => (
          <>
            {!confirmField ? (
              <>
                <InputPhone label="Номер телефона" id="phone" name="phone" />
                <button type="submit" className={s.submit}>
                  Получить код доступа
                </button>
              </>

            ) : (
              <>
                <Input id="code" label="Код подтверждения" name="code" type="text" autoFocus />
                <button type="submit" className={s.submit}>
                  Войти
                </button>
              </>
            )}

                {/* <Link href="/registration">
                  <a className={s.reg}>Зарегистрироваться</a>
                </Link> */}


              {/* <>
                 <div className={s.politics}>
                   <Input id="policy" name="policy" type="checkbox" additionClass="checkbox" />
                   <div className={s.label}>
                     <span>Я ознакомлен(-а)</span>
                     <button type="button" className={s.privacy} onClick={privacyModalHandler}>
                       с политикой конфиденциальности
                     </button>
                   </div>
                 </div>
                 <button className={s.submit} type="submit">
                   Зарегистрироваться
                 </button>
                 <Link href="/login">
                   <a className={s.reg}>Войти</a>
                 </Link>
               </> */}

          </>
        )}
      </FormContainer>
    </div>
  );
};
