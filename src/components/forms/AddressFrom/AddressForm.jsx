import React from 'react';
import { ADDRESS_VALIDATION_SCHEMA } from 'constants.js';
import { Input } from 'components/forms/Input/Input';
import { NewInput } from 'components/forms/Input/NewInput';
import { Textarea } from 'components/forms/Textarea/Textarea';
import { RemoveButton } from 'components/buttons/RemoveButton/RemoveButton';
import { FormContainer } from 'components/forms/FormContainer/FormContainer';
import { YMaps, Map } from 'react-yandex-maps';
import s from './AddressForm.module.scss';

export const AddressForm = ({ initialValues, removeAddressHandler, id }) => {
  const submitHandler = (values) => {
    alert(values);
  };

  const ymapsRef = React.useRef(null);
  const [userAddress, setUserAddress] = React.useState('')

  return (
    <FormContainer
      enableReinitialize
      initialValues={initialValues}
      // validationSchema={ADDRESS_VALIDATION_SCHEMA}
      validateOnChange={false}
      validateOnBlur={false}
      submitHandler={submitHandler}
    >
      {(formProps) => (
        <div className={s.form}>
          <div className={s.column}>
            <Input id={`title_${new Date().getTime()}`} label="Название адреса" name="title" type="text" />
            <NewInput 
              id={`user_address_${id}`} 
              label="Адрес" 
              name="user__address" 
              type="text" 
              value={userAddress}
              onChange={(e) => {
                setUserAddress(e.target.value)
                console.log(e.target.value)
              }}  />
            {/* <Input id={`city_${new Date().getTime()}`} label="Город" name="city" type="text" />
            <Input id={`street_${new Date().getTime()}`} label="Улица" name="street" type="text" /> */}
            <div className={s.column}>
              <Input id={`house_${new Date().getTime()}`} label="Дом" name="house" type="text" />
              <Input
                id={`floor_${new Date().getTime()}`}
                label="Подъезд"
                name="floor"
                type="email"
              />
            </div>
            <div className={s.column}>
              <Input
                id={`apartment_${new Date().getTime()}`}
                label="Офис/Квартира"
                name="apartment"
                type="text"
              />
              {/* <Input id={`code_${new Date().getTime()}`} label="Код" name="code" type="text" /> */}
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
              Редактировать
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
