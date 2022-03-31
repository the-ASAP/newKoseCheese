// @ts-nocheck
import React, { useState } from 'react';
import { ProfileSteps } from 'components/common/Profile/ProfileSteps/ProfileSteps';
import { FormContainer } from 'components/forms/FormContainer/FormContainer';
import { Input } from 'components/forms/Input/Input';
import { DropdownCustom } from 'components/common/DropdownCustom/DropdownCustom';
import { InputPhoto } from 'components/forms/InputPhoto/InputPhoto';
import { windowSize } from 'constants.js';
import { useClientSide } from 'hooks.js';
import { returnOrderSelector } from 'redux/slices/returnOrder';
import s from './ProfileReturn.module.scss';
import { Field } from 'formik';
import Dropdown from 'react-dropdown';
import { Textarea } from 'components/forms/Textarea/Textarea';
import APIBitrix from 'api/APIBitrix';
import { incPage, historyAttrItemsSelector, addNewHistory } from 'redux/slices/historyAttr';
import { historyItemsSelector } from 'redux/slices/history'
import { useDispatch, useSelector } from 'react-redux'
import { Order } from "components/Order/Order";
import { FarmContentLargeSection } from 'components/sections/farm/FarmContentLargeSection/FarmContentLargeSection';

const initialValues = {
  name: 'Сергей',
  phone: +79271015487,
  point: '',
  orderProduct: ''
};

const returnReasonOptions = ['Товар просрочен', 'Ненадлежащее качество товара', 'Я передумал'];

const salePoints = [
  'г. Москва, ул. Академика Королева, 12',
  'г. Москва, ул. Степана Разина, 3',
  'г. Москва, ул. Метро, 34'
];

export const ProfileReturn = () => {
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

  const submitHandler = (values) => {
    console.log(values);
    APIBitrix.post('forms/refund/', {
      values
    });
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
                        formProps.setFieldValue('orderNumber', e.value);
                        setOrderNumber(e.value)
                        setProductDropDownDisabled(false)
                        selectHandler(e);
                      }}
                    />

                    {/* <DropdownCustom
                      label={`*Выберите товар из списка" ${productDropDownDisabled ? "(Необходимо выбрать номер заказа)" : ""}`}
                      placeholder=""
                      disabled={productDropDownDisabled}
                      options={curProducts?.products?.map(
                        (product, i) => ({
                          value: product.id,
                          label: product.addition ? `${product.name} ${product.addition}` : `${product.name}`
                        })
                      )}
                      selectHandler={(e) => {
                        formProps.setFieldValue('orderProduct', e.value);
                      }}
                    /> */}

                    {/* <Input label="*Телефон" type="number" id="phone" name="phone" />
                    <Input label="*Имя" type="text" id="name" name="name" />
                     */}
                    <Input label="*Фио" type="text" id="fio" name="fio" />
                    <Input label="*Е-mail" type="text" id="email" name="email" />
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
                          name="replace"
                          value="product"
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
                          name="replace"
                          value="internal"
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
                          name="replace"
                          value="card"
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
                      <Input label="Номер карты" type="number" id="cardNumber" name="cardNumber" />
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
                          name="return"
                          value="toCourier"
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
                          name="return"
                          value="toPoint"
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
