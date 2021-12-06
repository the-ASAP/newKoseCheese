import React from 'react';
import clsx from 'clsx';

import { BackButton } from 'components/buttons/BackButton/BackButton';
import { Input } from 'components/forms/Input/Input';
import { InputPhone } from 'components/forms/InputPhone/InputPhone';
import { Textarea } from 'components/forms/Textarea/Textarea';
import { FormContainer } from 'components/forms/FormContainer/FormContainer';
import {
  PURCHASE_VALIDATION_SCHEMA,
  DELIVERY_VALIDATION_SCHEMA,
  EMPTY_VALIDATION_SCHEMA
} from 'constants.js';

import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { DropdownCustom } from 'components/common/DropdownCustom/DropdownCustom';
import { setConfirmOrder } from 'redux/slices/order';
import YandexDelivery from 'yandexDelivery';

import { YMaps, Map } from 'react-yandex-maps';
import { format } from 'date-fns';

import s from './OrderingSection.module.scss';

export const OrderingSection = ({ formData, setCost }) => {
  const { user_data: user, payments = [] } = formData;

  const formPropsRef = React.useRef(null);
  const formDaysRef = React.useRef(null);
  const formTimeRef = React.useRef(null);

  const paymentsOptions = payments.map((payment) => payment.title);
  const daysOptions = ['06.12', '07.12', '08.12', '09.12', '10.12', '11.12'];

  function getDays() {
    let date = Date.now();
    let day = 24 * 60 * 60 * 1000;
    let arrDays = [];

    for (let i = 1; i < 6; i++) {
      arrDays.push(format(date + day * i, 'dd/MM'));
    }

    return arrDays;
  }

  const timeOptions = [
    '10:00 - 12:00',
    '12:00 - 14:00',
    '14:00 - 16:00',
    '16:00 - 19:00',
    '19:00 - 22:00'
  ];

  const steps = [
    {
      title: 'Информация',
      stages: [
        {
          label: 'Телефон',
          type: 'tel',
          name: 'physical_phone',
          id: 'physical_phone',
          component: InputPhone
        },
        {
          label: 'Имя',
          type: 'text',
          name: 'physical_name',
          id: 'physical_name',
          component: Input
        },
        {
          label: 'E-mail',
          type: 'email',
          name: 'physical_email',
          id: 'physical_email',
          component: Input
        }
      ],
      initialValues: {
        physical_phone: user?.phone || '',
        physical_name: user?.name || '',
        physical_email: user?.email || ''
      },
      validationSchema: PURCHASE_VALIDATION_SCHEMA
    },
    {
      title: 'Доставка',
      stages: [
        {
          label: 'Адрес',
          type: 'text',
          name: 'physical_delivery_city',
          id: 'physical_delivery_city',
          component: Input
        },
        // {
        //   label: 'Улица',
        //   type: 'text',
        //   name: 'physical_delivery_street',
        //   id: 'physical_delivery_street',
        //   component: Input
        // },
        // {
        //   label: 'Дом',
        //   type: 'text',
        //   name: 'physical_delivery_building',
        //   id: 'physical_delivery_building',
        //   component: Input
        // },
        {
          label: 'Квартира',
          type: 'text',
          name: 'physical_delivery_apartment',
          id: 'physical_delivery_apartment',
          component: Input
        },
        {
          label: 'Комментарий',
          name: 'physical_delivery_comment',
          id: 'physical_delivery_comment',
          component: Textarea
        }
      ],
      initialValues: {
        physical_delivery_city: '',
        // physical_delivery_street: '',
        // physical_delivery_building: '',
        physical_delivery_apartment: '',
        physical_delivery_comment: ''
      },
      validationSchema: DELIVERY_VALIDATION_SCHEMA
    },
    {
      title: 'Оплата',
      stages: [
        {
          label: 'Выберите способ оплаты',
          placeholder: '',
          options: paymentsOptions,
          name: 'pay_system_id',
          id: 'pay_system_id',
          physical_delivery_mkad_distance: '',
          value: paymentsOptions[0],
          selectHandler: (e) => {
            formPropsRef.current.setFieldValue(
              'pay_system_id',
              payments.find((payment) => payment.title === e.value).id
            );
          },
          component: DropdownCustom
        },
        {
          label: 'Выберите день доставки',
          placeholder: '',
          options: getDays(),
          name: 'pay_day_id',
          id: 'pay_day_id',
          value: getDays()[0],
          selectHandler: (e) => {
            formDaysRef.current = { day: e.value };
          },
          component: DropdownCustom
        },
        {
          label: 'Выберите время доставки',
          placeholder: '',
          options: timeOptions,
          name: 'pay_time_id',
          id: 'pay_time_id',
          value: timeOptions[0],
          selectHandler: (e) => {
            formTimeRef.current = { time: e.value };
          },
          component: DropdownCustom
        }
      ],
      initialValues: {
        pay_system_id: paymentsOptions[0],
        physical_delivery_mkad_distance: ''
      },
      validationSchema: EMPTY_VALIDATION_SCHEMA
    }
  ];

  const dispatch = useDispatch();

  const [stageForm, setStageForm] = React.useState(0);
  const [sendData, setSendData] = React.useState({});
  const [deliveryDistance, setDeliveryDistance] = React.useState(null);
  const deliveryParams = [
    sendData?.physical_delivery_city
    // sendData?.physical_delivery_street,
    // sendData?.physical_delivery_building,
    // sendData?.physical_delivery_apartment
  ];
  React.useEffect(() => {
    formPropsRef.current.setFieldValue('physical_delivery_mkad_distance', deliveryDistance);
  }, [deliveryDistance]);

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
    if (stageForm + 1 === steps.length)
      formPropsRef.current.setFieldValue('pay_system_id', payments[0].id);
  }, [formPropsRef, stageForm, steps]);

  React.useEffect(() => {
    setSendData((prevState) => ({
      ...prevState,
      ...formPropsRef.current.values,
      ...formDaysRef.current,
      ...formTimeRef.current
    }));
  }, [stageForm]);

  const purchaseOrder = async () => {
    setSendData((prevState) => ({
      ...prevState,
      ...formPropsRef.current.values
    }));
    console.log({
      ...sendData,
      ...formPropsRef.current.values,
      ...formDaysRef.current,
      ...formTimeRef.current,
      delivery_id: 2
    });
    dispatch(
      setConfirmOrder({
        ...sendData,
        ...formPropsRef.current.values,
        ...formDaysRef.current,
        ...formTimeRef.current,
        delivery_id: 2
      })
    );
  };

  const router = useRouter();

  return (
    <div className={s.container}>
      <FormContainer
        enableReinitialize
        initialValues={steps[stageForm].initialValues}
        validateOnMount
        validationSchema={steps[stageForm].validationSchema}
        onSubmit={purchaseOrder}
      >
        {(formProps) => {
          formPropsRef.current = formProps;
          return (
            <>
              <BackButton
                additionClass="purchase"
                clickHandler={() => {
                  if (stageForm - 1 > -1) setStageForm((prev) => prev - 1);
                  else router.back();
                }}
              />
              {formData ? (
                <div className={s.purchase}>
                  <h2 className={s.title}>Оформление заказа</h2>
                  <div className={s.steps}>
                    {steps.map((step, index) => (
                      <button
                        type="button"
                        key={index}
                        className={clsx(s.step, index === stageForm && s.active)}
                      >
                        {step.title}
                      </button>
                    ))}
                  </div>
                  <div className={s.stage}>
                    {steps[stageForm].stages.map((input, index) => {
                      const ComponentName = input.component;
                      return <ComponentName key={index} {...input} />;
                    })}
                  </div>
                  {deliveryParams[0] && stageForm === 2 && (
                    <YandexDelivery
                      setCost={setCost}
                      setDeliveryDistance={setDeliveryDistance}
                      deliveryParams={deliveryParams}
                    />
                  )}
                  <button
                    type="button"
                    onClick={stageForm + 1 === steps.length ? purchaseOrder : changeFormSteps}
                    className={s.submit}
                  >
                    Оформить заказ
                  </button>
                </div>
              ) : (
                <div className={s.loader} />
              )}
            </>
          );
        }}
      </FormContainer>
      {stageForm === 1 && (
        <div style={{ display: 'none' }}>
          <YMaps>
            <Map
              onLoad={(ymaps) => new ymaps.SuggestView('physical_delivery_city')}
              defaultState={{ center: [55.751574, 37.573856], zoom: 9 }}
              modules={['SuggestView']}
            />
          </YMaps>
        </div>
      )}
    </div>
  );
};
