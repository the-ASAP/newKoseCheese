import React from "react";
import { ProfileSteps } from "components/common/Profile/ProfileSteps/ProfileSteps";
import { Order } from "components/Order/Order";
import { FormContainer } from "components/forms/FormContainer/FormContainer";
import { Input } from "components/forms/Input/Input";
import { DropdownCustom } from "components/common/DropdownCustom/DropdownCustom";
import { InputPhoto } from "components/forms/InputPhoto/InputPhoto";
import { windowSize } from "constants.js";
import { useClientSide } from "hooks.js";
import { returnOrderSelector } from "redux/slices/returnOrder";
import s from "./ProfileReturn.module.scss";
import { Field } from "formik";
import Dropdown from "react-dropdown";

const initialValues = {
  name: "Сергей",
  phone: +79271015487,
  point: "",
  orderProduct: ""
};
const returnReasonOptions = [
  "Товар просрочен", "Ненадлежащее качество товара", "Я передумал"
];

const salePoints = [
  "г. Москва, ул. Академика Королева, 12", "г. Москва, ул. Степана Разина, 3", "г. Москва, ул. Метро, 34"
];

export const ProfileReturn = () => {

  const allOrders = [36956, 34951, 43123, 23461];

  const currentProducts = [
    {
      name: "Камамбер козий",
      count: 4
    }, {
      name: "Брю-де-шар",
      count: 7
    }
  ];

  const [orderNumber, setOrderNumber] = React.useState("");
  const [curProducts, setCurProducts] = React.useState([]);

  const submitHandler = (value) => {
    console.log(value);
  };

  const selectHandler = (value) => {
    setOrderNumber(value);
  };

  React.useEffect(() => {

    // async stuff
    orderNumber && setCurProducts(currentProducts);

  }, [orderNumber]);

  const isClientSide = useClientSide();

  return (
    <>
      {
        isClientSide &&
        <>
          <ProfileSteps/>
          <FormContainer
            initialValues={initialValues}
            submitHandler={submitHandler}
          >
            {(formProps) => (
              <>

                <h3 className={s.title}>Заявление на замену</h3>
                <div className={s.container}>
                  <div className={s.block}>
                    <DropdownCustom
                      label="*Номер заказа"
                      placeholder=""
                      options={allOrders}
                      selectHandler={(e) => {
                        formProps.setFieldValue("orderNumber", e.value);
                        selectHandler(e);
                      }
                      }/>
                    {
                      curProducts.length > 0 &&
                      <DropdownCustom
                        label="*Выберите товар из списка"
                        placeholder=""
                        options={curProducts.map(product => `${product.name}, ${product.count} шт.`)}
                        selectHandler={(e) => {
                          formProps.setFieldValue("orderProduct", e.value);
                        }
                        }/>
                    }
                    <Input label="*Телефон" type="number" id="phone" name="phone"/>
                    <Input label="*Имя" type="text" id="name" name="name"/>
                    <Input label="Фамилия" type="text" id="surname" name="surname"/>
                    <Input label="Е-mail" type="text" id="email" name="email"/>
                    <DropdownCustom
                      label="*Причина замены"
                      placeholder="Выберите причину"
                      options={returnReasonOptions}
                      selectHandler={(e) => {
                        formProps.setFieldValue("reason", e.value);
                      }
                      }
                    />
                    <div className={s.replace}>
                      <span className={s.subtitle}>Замена на</span>
                      <div className={s.onchange}>
                        <Input id="product" name="replace" value="product" type="radio" additionClass="checkbox"/>
                        <label htmlFor="product" className={s.label}>Товар</label>
                      </div>
                      <div className={s.onchange}>
                        <Input id="internal" name="replace" value="internal" type="radio" additionClass="checkbox"/>
                        <label htmlFor="internal" className={s.label}>На внутренний счет</label>
                      </div>
                      <div className={s.onchange}>
                        <Input id="card" name="replace" value="card" type="radio" additionClass="checkbox"/>
                        <label htmlFor="card" className={s.label}>Деньги на карту</label>
                      </div>
                    </div>
                    <Input label="Номер карты" type="number" id="cardNumber" name="cardNumber"/>

                  </div>
                  <div className={s.block}>
                    <span className={s.subtitle}>*Добавить фото чека и продукта</span>
                    <div className={s.photos}>
                      <InputPhoto id="photo1" name="photo1" className="replace" formProps={formProps}/>
                      <InputPhoto id="photo2" name="photo2" className="replace" formProps={formProps}/>
                      {
                        (windowSize < 768 || windowSize > 1024)
                        &&
                        <InputPhoto id="photo3" name="photo3" className="replace" formProps={formProps}/>
                      }
                    </div>
                    <div className={s.replace}>
                      <div className={s.onchange}>
                        <Input id="toCourier" name="return" value="toCourier" type="radio" additionClass="checkbox"/>
                        <label htmlFor="toCourier" className={s.label}>Вернём товар курьеру</label>
                      </div>
                      <div className={s.onchange}>
                        <Input id="toPoint" name="return" value="toPoint" type="radio" additionClass="checkbox"/>
                        <label htmlFor="toPoint" className={s.label}>Вернём товар на точку продаж</label>
                      </div>
                    </div>
                    <DropdownCustom
                      label="Точка продаж"
                      placeholder="Выберите точку продаж"
                      options={salePoints}
                      selectHandler={(e) => {
                        formProps.setFieldValue("point", e.value);
                      }
                      }
                    />
                  </div>
                </div>
                <button type="submit" className={s.submit}>Отправить заявку</button>
              </>
            )}
          </FormContainer>
        </>}
    </>
  );
};

