import React from 'react';
import s from './TotalPrice.module.scss';

export const TotalPrice = ({ value, className }) => (
  <div className={className || s.total}>
    <h3>Итого: </h3>
    <span className={s.value}>{value} руб.</span>
  </div>
);
