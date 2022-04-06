import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import { historyItemsSelector } from 'redux/slices/history'
import { ProfileControls } from "components/common/Profile/ProfileControls/ProfileControls";
import { Order } from "components/Order/Order";
import s from "./ProfileOrders.module.scss";
import { incPage, historyAttrItemsSelector, addNewHistory } from 'redux/slices/historyAttr';


export const ProfileOrders = () => {
  const history = useSelector(historyItemsSelector)
  const historyAttr = useSelector(historyAttrItemsSelector)
  const dispatch = useDispatch()

  const addMoreProducts = () => {
    dispatch(incPage())
  }

  // @ts-ignore
  // React.useEffect(() => {
  //   return historyAttr.page !== 1 ? dispatch(addNewHistory()) : null
  // }, [historyAttr.page])

  return (
    <>
      {/* <ProfileControls/>
      {history && history?.orders?.map((order, i) => <Order data={order} key={Date.now() + i} controls/>)}
      {history?.orders?.length > 0 && history?.count && (history?.count > history?.orders.length) && <button type="button" className={s.more} onClick={addMoreProducts}>Показать еще +</button>} */}
    </>
  );
};
