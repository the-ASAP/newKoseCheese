// @ts-nocheck
import React, { useState } from 'react';
import { ProfileSteps } from 'components/common/Profile/ProfileSteps/ProfileSteps';
import { FormContainer } from 'components/forms/FormContainer/FormContainer';
import { Input } from 'components/forms/Input/Input';
import { DropdownCustom } from 'components/common/DropdownCustom/DropdownCustom';
import { InputPhoto } from 'components/forms/InputPhoto/InputPhoto';
import { windowSize } from 'constants.js';
import { useClientSide } from 'hooks.js';
import s from './ProfileReturn.module.scss';
import { Textarea } from 'components/forms/Textarea/Textarea';
import { historyItemsSelector } from 'redux/slices/history'
import { useDispatch, useSelector } from 'react-redux'
import { Order } from "components/Order/Order";
import { userInfoSelector } from 'redux/slices/user';
import APIBitrix from 'api/APIBitrix';
import { popUpChangeModalState } from 'redux/slices/modals';

const initialValues = {};

const returnReasonOptions = ['Товар просрочен', 'Ненадлежащее качество товара', 'Я передумал'];

const salePoints = [
  'г. Москва, ул. Академика Королева, 12',
  'г. Москва, ул. Степана Разина, 3',
  'г. Москва, ул. Метро, 34'
];

export const ProfileReturn = () => {
  const dispatch = useDispatch()
  const userInfo = useSelector(userInfoSelector);
  const { orders } = useSelector(historyItemsSelector)

  const allOrders = orders.map(order => order.id)

  const [orderNumber, setOrderNumber] = React.useState(0);
  const [curProducts, setCurProducts] = React.useState(null);
  const [productDropDownDisabled, setProductDropDownDisabled] = useState(true)

  React.useEffect(() => {
    if (orderNumber) {
      const selectedProduct = orders.find(item => item.id === orderNumber.value)
      setCurProducts(selectedProduct)
    }
  }, [orderNumber]);

  const isClientSide = useClientSide();

  const [showSalePoints, setShowSalePoints] = React.useState(false);
  const [showDCardNumber, setShowCardNumber] = React.useState(false);

  const [returnProducts, setReturnProducts] = useState([])

  const submitHandler = (values) => {
    const submitValues = {
      ...values,
      order_items: [...returnProducts],
      user_phone: userInfo.phone,
      images: [values.photo1, values.photo2, values.photo3].filter(Boolean)
    }
    delete submitValues.photo1
    delete submitValues.photo2
    delete submitValues.photo3

    APIBitrix.post(
      'forms/refund/', {
      submitValues
    }).then((res) => {
      if (res.code === 404) {
        dispatch(
          popUpChangeModalState({
            visible: true,
            text: 'Произошла ошибка. Попробуйте отправить запрос позже'
          })
        )
      }
      else {
        dispatch(
          popUpChangeModalState({
            visible: true,
            text: 'Заявка на возврат успешно отправлена.'
          })
        )
      }
    })
  };

  const selectHandler = (value) => {
    setOrderNumber(value);
  };

  return (
    <>
      {isClientSide && (
        <>
          <ProfileSteps />
          {curProducts &&
            <div className={s.order}>
              <Order data={{ ...curProducts, status: 'Замена' }}
                controls
                return
                showOrderControls={false}
                showControlButtons={true}
                setReturnProducts={setReturnProducts}
              />
            </div>
          }
          <FormContainer initialValues={initialValues} onSubmit={submitHandler}>
            {(formProps) => (
              <>
                <h3 className={s.title}>Заявка на замену</h3>
                <div className={s.container}>
                  <div className={s.block}>
                    <DropdownCustom
                      label="*Номер заказа"
                      placeholder=""
                      options={allOrders}
                      selectHandler={(e) => {
                        formProps.setFieldValue('order_id', e.value);
                        setOrderNumber(e.value)
                        setProductDropDownDisabled(false)
                        selectHandler(e);
                      }}
                    />
                    <Input label="*Имя" type="text" id="name" name="user_name" />
                    <Input label="*Фамилия" type="text" id="surname" name="user_surname" />
                    <Input label="*Е-mail" type="text" id="email" name="user_email" />
                    <DropdownCustom
                      label="*Причина замены"
                      placeholder="Выберите причину"
                      options={returnReasonOptions}
                      selectHandler={(e) => {
                        formProps.setFieldValue('reason', e.value);
                      }}
                    />
                    <Textarea
                      id={`comment_${new Date().getTime()}`}
                      label="*Описание проблемы"
                      name="comment"
                      type="text"
                    />
                    <div className={s.replace}>
                      <span className={s.subtitle}>Замена на</span>
                      <div className={s.onchange}>
                        <Input
                          id="product"
                          name="exchange_for"
                          value="Товар"
                          type="radio"
                          additionClass="checkbox"
                          onClick={() => setShowCardNumber(false)}
                        />
                        <label htmlFor="product" className={s.label}>
                          Товар
                        </label>
                      </div>
                      <div className={s.onchange}>
                        <Input
                          id="internal"
                          name="exchange_for"
                          value="На внутренний счет"
                          type="radio"
                          additionClass="checkbox"
                          onClick={() => setShowCardNumber(false)}
                        />
                        <label htmlFor="internal" className={s.label}>
                          На внутренний счет
                        </label>
                      </div>
                      <div className={s.onchange}>
                        <Input
                          id="card"
                          name="exchange_for"
                          value="Деньгами на карту"
                          type="radio"
                          additionClass="checkbox"
                          onClick={() => setShowCardNumber(true)}
                        />
                        <label htmlFor="card" className={s.label}>
                          Деньгами на карту
                        </label>
                      </div>
                    </div>
                    {showDCardNumber &&
                      <Input label="Номер карты" type="number" id="cardNumber" name="card_number" />
                    }
                  </div>
                  <div className={s.block}>
                    <span className={s.subtitle}>*Добавить фото чека и продукта</span>
                    <div className={s.photos}>
                      <InputPhoto
                        id="photo1"
                        name="photo1"
                        className="replace"
                        formProps={formProps}
                      />
                      <InputPhoto
                        id="photo2"
                        name="photo2"
                        className="replace"
                        formProps={formProps}
                      />
                      {(windowSize < 768 || windowSize > 1024) && (
                        <InputPhoto
                          id="photo3"
                          name="photo3"
                          className="replace"
                          formProps={formProps}
                        />
                      )}
                    </div>
                    <div className={s.replace}>
                      <div className={s.onchange}>
                        <Input
                          id="toCourier"
                          name="send_to"
                          value="Вернём товар курьеру"
                          type="radio"
                          additionClass="checkbox"
                          onClick={(e) => setShowSalePoints(false)}
                        />
                        <label htmlFor="toCourier" className={s.label}>
                          Вернём товар курьеру
                        </label>
                      </div>
                      <div className={s.onchange}>
                        <Input
                          id="toPoint"
                          name="send_to"
                          value="Вернём товар на точку продаж"
                          type="radio"
                          additionClass="checkbox"
                          onClick={(e) => setShowSalePoints(true)}
                        />
                        <label htmlFor="toPoint" className={s.label}>
                          Вернём товар на точку продаж
                        </label>
                      </div>
                    </div>
                    {showSalePoints && (
                      <DropdownCustom
                        label="Точка продаж"
                        placeholder="Выберите точку продаж"
                        options={salePoints}
                        selectHandler={(e) => {
                          formProps.setFieldValue('point', e.value);
                        }}
                      />
                    )}
                  </div>
                </div>
                <button type="submit" className={s.submit}>
                  Отправить заявку
                </button>
              </>
            )}
          </FormContainer>
        </>
      )}
    </>
  );
};
