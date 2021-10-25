import React from "react";
import clsx from "clsx";

import { BackButton } from "components/buttons/BackButton/BackButton";
import { Input } from "components/forms/Input/Input";
import { InputPhone } from "components/forms/InputPhone/InputPhone";
import { Textarea } from "components/forms/Textarea/Textarea";
import { FormContainer } from "components/forms/FormContainer/FormContainer";
import { PURCHASE_VALIDATION_SCHEMA, DELIVERY_VALIDATION_SCHEMA, EMPTY_VALIDATION_SCHEMA, windowSize } from "constants.js";
import { reqPurchaseOrder } from "redux/slices/cart";
import { useDispatch } from "react-redux";
import { DropdownCustom } from "components/common/DropdownCustom/DropdownCustom";
import s from "./OrderingSection.module.scss";

export const OrderingSection = () => {

  const formPropsRef = React.useRef(null);

  const steps = [{
    title: "Информация",
    stages: [{
      label: "Телефон",
      type: "tel",
      name: "phone",
      id: "phone",
      component: InputPhone
    }, {
      label: "Имя",
      type: "text",
      name: "name",
      id: "name",
      component: Input
    }, {
      label: "E-mail",
      type: "email",
      name: "email",
      id: "email",
      component: Input
    }],
    initialValues: {
      phone: "",
      name: "",
      email: ""
    },
    validationSchema: PURCHASE_VALIDATION_SCHEMA
  }, {
    title: "Доставка",
    stages: [{
      label: "Город",
      type: "text",
      name: "city",
      id: "city",
      component: Input
    }, {
      label: "Улица",
      type: "text",
      name: "street",
      id: "street",
      component: Input
    }, {
      label: "Дом",
      type: "text",
      name: "house",
      id: "house",
      component: Input
    }, {
      label: "Квартира",
      type: "text",
      name: "apartment",
      id: "apartment",
      component: Input
    },
      {
        label: "Комментарий",
        name: "comment",
        id: "comment",
        component: Textarea
      }],
    initialValues: {
      city: "",
      street: "",
      house: "",
      apartment: "",
      comment: ''
    },
    validationSchema: DELIVERY_VALIDATION_SCHEMA
  },
    {
      title: "Оплата",
      stages: [{
        label: "Выберите способ оплаты",
        placeholder: "",
        options: ['Оплата онлайн', 'Оплата наличными', 'Оплата по Б/C'],
        name: "payment",
        id: "payment",
        value: "Оплата онлайн",
        selectHandler: (e) => {
          formPropsRef.current.setFieldValue('payment', e.value);
        },
        component: DropdownCustom
      }],
      initialValues: {
        payment: "Оплата онлайн"
      },
      validationSchema: EMPTY_VALIDATION_SCHEMA
    }
  ];

  const dispatch = useDispatch();



  const [stageForm, setStageForm] = React.useState(0);
  const [sendData, setSendData] = React.useState({});

  React.useEffect(() => {

  }, [sendData])



  const changeFormSteps = () => {

    const isErrors = Object.keys(formPropsRef.current.errors).length;

    setStageForm((prev) => {
      if (stageForm + 1 < steps.length && !isErrors) {
        return prev + 1;
      }
      return prev;
    });
  };


  React.useEffect(() => {
    setSendData(prevState => ({
      ...prevState,
      ...formPropsRef.current.values
    }));
  }, [stageForm])

  const purchaseOrder = async () => {
    setSendData(prevState => ({
      ...prevState,
      ...formPropsRef.current.values
    }));
    // purchase call
    dispatch(reqPurchaseOrder())
  }



  return (
    <div className={s.container}>
      <FormContainer
        enableReinitialize
        initialValues={steps[stageForm].initialValues}
        validateOnMount
        validationSchema={steps[stageForm].validationSchema}
      >
        {(formProps) => {
          formPropsRef.current = formProps;
          return (
            <>
              <BackButton additionClass="purchase"/>
              <div className={s.purchase}>
                <h2 className={s.title}>Оформление заказа</h2>
                <div className={s.steps}>
                  {steps.map((step, index) =>
                    <button type="button"
                            key={index}
                            className={clsx(s.step, index === stageForm && s.active)}>
                      {step.title}
                    </button>)}
                </div>
                <div className={s.stage}>
                  {
                    steps[stageForm].stages.map((input, index) => {
                      const ComponentName = input.component;
                      return <ComponentName key={index} {...input}/>;
                    })
                  }
                </div>
                <button
                  type="button"
                  onClick={stageForm + 1 === steps.length ? purchaseOrder : changeFormSteps}
                  className={s.submit}
                >
                  Оформить заказ
                </button>
              </div>
            </>
          )
        }}
      </FormContainer>
    </div>
  );
};
