import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newPhonePopupChangeState, popUpChangeModalState } from 'redux/slices/modals';
import { InputPhone } from 'components/forms/InputPhone/InputPhone';
import { FormContainer } from 'components/forms/FormContainer/FormContainer';
import APIBitrix from 'api/APIBitrix';
import { setUserInfo, setUserPhone, userIdSelector, userInfoSelector } from 'redux/slices/user';
import { Input } from 'components/forms/Input/Input';
import Login from 'pages/login';
import s from './ChangePhonePopup.module.scss';

export const ChangePhonePopup = () => {
  const dispatch = useDispatch();
  const userId = useSelector(userIdSelector);
  const userInfo = useSelector(userInfoSelector);
  const [isConfirm, setConfirm] = React.useState(false);

  const changePhoneHandler = async ({ newPhone }) => {
    await APIBitrix.post('user/new-phone/', {
      new_phone: newPhone.replace(/\s+/g, '')
    });
    await setConfirm(true);
  };

  const confirmNewPhoneHandler = async ({ newPhone, code }) => {
    const response = await APIBitrix.post('user/new-phone/confirm/', {
      new_phone: newPhone.replace(/\s+/g, ''),
      code
    });
    await dispatch(
      setUserInfo({
        ...userInfo,
        phone: newPhone.replace(/\s+/g, '')
      })
    );
    await dispatch(setUserPhone(newPhone));
    await dispatch(newPhonePopupChangeState(false));
    await dispatch(
      popUpChangeModalState({
        visible: true,
        text: 'Телефон был успешно изменен'
      })
    );
    // await dispatch(popUpChangeModalState({
    //   visible: true,
    //   text: "Номер телефона был успешно изменен"
    // }));
  };

  return (
    <div className={s.container}>
      <div className={s.header}>
        <h4 className={s.title}>Укажите новый номер</h4>
        <p className={s.text}>На него мы отправим код подтверждения</p>
      </div>
      <div className={s.form}>
        <FormContainer
          initialValues={{
            newPhone: ''
          }}
          onSubmit={isConfirm ? confirmNewPhoneHandler : changePhoneHandler}
        >
          {() => (
            <>
              <InputPhone name="newPhone" id="newPhone" label="Телефон" />
              {isConfirm && <Input name="code" id="code" label="Код подтверждения" />}
              <button type="submit" className={s.ok}>
                {isConfirm ? 'Хорошо' : 'Получить код'}
              </button>
            </>
          )}
        </FormContainer>
      </div>
    </div>
  );
};
