import React from "react";
import { AddressForm } from "components/forms/AddressFrom/AddressForm";
import s from "./ProfileDelivery.module.scss";


export const ProfileDelivery = (props) => {

  const initialAddresses = [{
    id: 1,
    city: "Москва"
  }, {
    id: 2,
    city: "",
    street: "Аткарская"
  }];


  const [addresses, setAddresses] = React.useState(initialAddresses);

  const addNewAddressHandler = () => {
    setAddresses(prev => [
      ...prev,
      {
        id: (new Date).getTime()
      }
    ]);
  };

  const removeAddressHandler = (formProps, id) => {
    setAddresses(addresses.filter(point => id !== point.id));
  };
  return (
    <div className={s.wrapper}>
      {
        addresses.map(point =>
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

