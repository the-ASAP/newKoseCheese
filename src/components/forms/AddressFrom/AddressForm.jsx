import React from 'react';
import { ADDRESS_VALIDATION_SCHEMA } from 'constants.js';
import { Input } from 'components/forms/Input/Input';
import { NewInput } from 'components/forms/Input/NewInput';
import { Textarea } from 'components/forms/Textarea/Textarea';
import { RemoveButton } from 'components/buttons/RemoveButton/RemoveButton';
import { FormContainer } from 'components/forms/FormContainer/FormContainer';
import { YMaps, Map } from 'react-yandex-maps';
import s from './AddressForm.module.scss';
import APIBitrix from 'api/APIBitrix'
import { popUpChangeModalState } from 'redux/slices/modals';
import { useDispatch } from 'react-redux';

export const AddressForm = ({ initialValues, removeAddressHandler, id }) => {
  const dispatch = useDispatch()

  const submitHandler = async (values) => {
    const submitValues = {
      ...values,
      default: false,
      address: userAddress,
    }

    if (initialValues.newId) {
      await APIBitrix.post(
        `user/addresses/add/`,
        {
          items: [submitValues]
        }
      ).then((res) => {
        if (res.code === 404) {
          dispatch(popUpChangeModalState({
            visible: true,
            text: `Произошла ошибка, проверьте поля или попробуйте отправить данные позже`
          }))
        }
        else {
          dispatch(popUpChangeModalState({
            visible: true,
            text: `Данные успешно добавлены`
          }))
        }
      })
    }
    else {
      await APIBitrix.post(
        `user/addresses/update/`,
        submitValues
      ).then((res) => {
        if (res.code === 404) {
          dispatch(popUpChangeModalState({
            visible: true,
            text: `Произошла ошибка, проверьте поля или попробуйте отправить данные позже`
          }))
        }
        else {
          dispatch(popUpChangeModalState({
            visible: true,
            text: `Данные успешно изменены`
          }))
        }
      })
    }
  };

  const ymapsRef = React.useRef(null);
  const [userAddress, setUserAddress] = React.useState(initialValues.address)

  return (
    <FormContainer
      enableReinitialize
      initialValues={initialValues}
      onSubmit={submitHandler}
    >
      {(formProps) => (
        <div className={s.form}>
          <div className={s.column}>
            <Input id={`title_${new Date().getTime()}`} label="Название адреса" name="name" type="text" />
            <NewInput
              id={`user_address_${id}`}
              label="Адрес"
              name="address"
              type="text"
              value={userAddress}
              onChange={(e) => {
                setUserAddress(e.target.value)
              }}  />
            <div className={s.column}>
              <Input
                id={`approach_${new Date().getTime()}`}
                label="Подъезд"
                name="approach"
                type="text"
              />
            </div>
            <div className={s.column}>
              <Input
                id={`apartment_${new Date().getTime()}`}
                label="Офис/Квартира"
                name="apartment"
                type="text"
              />
            </div>
          </div>
          <div className={s.column}>
            <Textarea
              id={`comment_${new Date().getTime()}`}
              label="Комментарий"
              name="comment"
              type="text"
            />
          </div>
          <div className={s.controls}>
            <button type="submit" className={s.submit}>
              Сохранить
            </button>
            <RemoveButton clickHandler={() => removeAddressHandler(formProps, id)} />
          </div>
          <div style={{ display: 'none' }}>
          <YMaps query={{ load: 'package.full', apikey: '22831a61-cd4e-43d4-a56e-13b907784078' }}>
            <Map
              onLoad={(ymaps) => {
                let suggest = new ymaps.SuggestView(`user_address_${id}`);
                suggest.events.add('select', function (e) {
                  setUserAddress(e.get('item').value);
                });

                ymapsRef.current = ymaps;
              }}
              defaultState={{ center: [55.751574, 37.573856], zoom: 9 }}
              modules={['SuggestView']}
            />
          </YMaps>
        </div>
        </div>
      )}
    </FormContainer>
  );
};
