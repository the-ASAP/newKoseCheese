import React from 'react';
import Link from 'next/link';
import { RedWine, WhiteWine, Vegetables, Fruits } from 'components/SVG/TastesSVG/TastesSVG';
import { ControlButtons } from 'components/buttons/ControlButtons/ControlButtons';
import { BASE_SITE_URL } from 'constants.js';
import s from './NewTaste.module.scss';

const allTastes = {
  'red-wine': <RedWine key={0} />,
  'white-wine': <WhiteWine key={1} />,
  vegetables: <Vegetables key={2} />,
  fruits: <Fruits key={3} />
};
const countryFlags = {
  french: '/static/img/icons/french-flag.jpg',
  russian: '/static/img/icons/rus-flag.jpg'
};

export const NewTaste = (props) => {
  const { id, name, addition, previewImage, detailImage, price, weight, status } = props;
  const productProps = { id, name, addition, previewImage, price, weight, count: 1, status };
  return (
    <div className={s.card}>
      <Link href={`products/${id}`}>
        <a className={s.link} />
      </Link>
      <ControlButtons productProps={productProps} />
      <div className={s.body}>
        <img src={BASE_SITE_URL + detailImage} alt={name} className={s.image} />
      </div>
      <h3 className={s.name}>{name}</h3>
      <span className={s.addition}>{addition}</span>
    </div>
  );
};
