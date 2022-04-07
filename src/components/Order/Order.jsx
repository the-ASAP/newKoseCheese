import React from "react";
import { OrderHeader } from "components/Order/OrderHeader/OrderHeader";
import { OrderItem } from "components/Order/OrderItem/OrderItem";
import { FormContainer } from "components/forms/FormContainer/FormContainer";

import { OrderControls } from "components/Order/OrderControls/OrderControls";
import { SubscribeControls } from "components/Order/SubscribeControls/SubscribeControls";
import s from "components/Order/Order.module.scss";

export const Order = ({ controls, subscribe, data, showOrderControls = true, showControlButtons, }) => {
  let { products, ...orderInfo } = data;

  const quantityProducts = data.products.reduce((acc, item) => {
    if(item && item.quantity) {
      return acc + ~~Number(item.quantity)
    }
  }, 0)

  orderInfo = {...orderInfo, count: quantityProducts}

  const getOrders = (controlPanel, props) => products?.map((order, i) =>
    <OrderItem controls={controlPanel} key={i} controlButtons={showControlButtons} {...order} {...props}/>);

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
              {showOrderControls && <OrderControls formProps={formProps} order={data} />}
            </>
          )}
        </FormContainer>
        :
        <div>{getOrders(false)}</div>}
      {subscribe && <SubscribeControls/>}

    </div>
  );
};
