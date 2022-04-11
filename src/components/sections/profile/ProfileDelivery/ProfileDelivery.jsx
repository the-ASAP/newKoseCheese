// @ts-nocheck
import React, { useState, useEffect } from "react";
import { AddressForm } from "components/forms/AddressFrom/AddressForm";
import s from "./ProfileDelivery.module.scss";
import APIBitrix from 'api/APIBitrix'
import { popUpChangeModalState } from 'redux/slices/modals';
import { useDispatch } from 'react-redux';

export const ProfileDelivery = (props) => {
  const dispatch = useDispatch()
  const [addresses, setAddresses] = React.useState([]);

  useEffect(() => {
    const getAddresses = async () => {
      await APIBitrix.get(`user/addresses/items/`).then(res => setAddresses(res))
    }
    getAddresses()
  }, [])

  const addNewAddressHandler = () => {
    setAddresses(prev => [
      ...prev,
      {
        newId: (new Date).getTime()
      }
    ]);
  };

  const removeAddressHandler = async (formProps, id) => {
    await APIBitrix.post(`user/addresses/delete/`, { ids: id })
      .then(() => {
        dispatch(popUpChangeModalState({
          visible: true,
          text: 'Адресс удален'
        }))
        // setAddresses(addresses.filter(point => id !== point.id));
        const getAddresses = async () => {
          await APIBitrix.get(`user/addresses/items/`).then(res => setAddresses(res))
        }
        getAddresses()
      })
      .catch(() => {
        dispatch(popUpChangeModalState({
          visible: true,
          text: 'Произошла ошибка'
        }))
      })
  };

  console.log(addresses)

  return (
    <div className={s.wrapper}>
      {
        addresses?.map(point =>
          <AddressForm
            key={point.id}
            id={point.id}
            initialValues={point}
            removeAddressHandler={removeAddressHandler}/>)
      }
      <button type="button" onClick={addNewAddressHandler} className={s.add}>Добавить адрес +</button>
    </div>
  );
};
