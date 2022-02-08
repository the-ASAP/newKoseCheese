import React from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { BASE_SITE_URL } from 'constants.js';
import { NewPurchaseControl } from '../PurchaseControl/NewPurchaseControl';
import { FavoriteControl } from '../FavoriteControl/FavoriteControl';
import { useDispatch } from "react-redux";
import { closeAllModals } from "redux/slices/modals";

import s from './Purchase.module.scss';

export const Purchase = ({ inFavorite, active, inCart, inOrder, params }) => {
  const defaults = {
    previewImage: '',
    name: '',
    addition: '',
    price: 0,
    weight: 0,
    quantity: 0
  };
  const properties = {
    ...defaults,
    ...params
  };

  const { previewImage, name, addition, price, weight, quantity, id } = properties;

  const router = useRouter()
  const dispatch = useDispatch();

  const handleClick = (id) => {
    router.push(`/products/${id}`)
    dispatch(closeAllModals())
  }

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
          <img src={BASE_SITE_URL + previewImage} alt="" className={s.image} onClick={() => handleClick(id)}/>
      </div>
      <div className={s.info}>
        <div className={s.block}>
          <h3 className={s.title}>
            {name}{' '}
            {inOrder && (
              <span className={s.count}>
                - {parseInt(quantity, 10)} <span style={{ fontSize: '1rem' }}>шт.</span>
              </span>
            )}
          </h3>
          <div className={s.addition}>{addition}</div>
          <div className={s.cost}>
            <span className={s.price}>{price * Number(quantity)} руб.</span>
            <span className={s.weight}>{parseInt(weight, 10)} г.</span>
          </div>
        </div>
        <div className={s.controls}>
          {inFavorite && <FavoriteControl product={properties} />}
          {inCart && <NewPurchaseControl inCart additionClass="inCart" product={properties} />}
        </div>
      </div>
    </div>
  );
};
