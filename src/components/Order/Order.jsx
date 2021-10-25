import React from "react";
import { OrderHeader } from "components/Order/OrderHeader/OrderHeader";
import { OrderItem } from "components/Order/OrderItem/OrderItem";
import { FormContainer } from "components/forms/FormContainer/FormContainer";

import { OrderControls } from "components/Order/OrderControls/OrderControls";
import { SubscribeControls } from "components/Order/SubscribeControls/SubscribeControls";
import { useDispatch } from "react-redux";
import s from "components/Order/Order.module.scss";


export const Order = ({ controls, subscribe, data }) => {

  const dispatch = useDispatch();

  const { products, ...orderInfo } = data;

  const getOrders = (controlPanel, props) => products.length ? products.map((order, i) => i < 2 &&
    <OrderItem controls={controlPanel} key={i} {...order} {...props}/>) : "";


  return (
    <div className={s.container}>
      <OrderHeader data={orderInfo}/>
      {controls ?
        <FormContainer initialValues={{}}>
          {(formProps) => (
            <>
              <div>
                {getOrders(true, formProps)}
              </div>
              <OrderControls formProps={formProps} order={data}/>
            </>
          )}
        </FormContainer>
        :
        <div>{getOrders(false)}</div>}
      {subscribe && <SubscribeControls/>}
    </div>
  );
};

