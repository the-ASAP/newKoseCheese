import React from "react";
import { ProfileControls } from "components/common/Profile/ProfileControls/ProfileControls";
import { Order } from "components/Order/Order";
import { orders } from "constants.js";

export const ProfileSubscribe = () => {
  return (
    <div>
      <ProfileControls/>
      {orders.map((order, i) => <Order data={order} key={i} subscribe/>)}
    </div>
  );
};

