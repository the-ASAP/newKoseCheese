import React from "react";
import Link from "next/link";
import clsx from "clsx";
import { SliderCounter } from "components/common/Slider/SliderCounter/SliderCounter";
import s from "./SliderNav.module.scss";

export const SliderNav = (props) => {
  const { title, prev, next, allCount, currentCount, params: { counter, counterBottom, seeAll, isGallery, additionClass, hide } } = props;
  const counterProps = { isGallery, counter, counterBottom, currentCount, allCount, prev, next, additionClass, hide };
  return (
    <>
      <div className={clsx(s.wrapper, isGallery && s.bottom)}>
        {title && <h2>{title}</h2>}
        {seeAll?.visible &&
        <Link href={seeAll.link}><a className={clsx(s.link, s[seeAll.position])}>Посмотреть все</a></Link>}
        {!counterBottom && <SliderCounter {...counterProps}/>}
      </div>
      {counterBottom && <SliderCounter {...counterProps}/>}
    </>
  );
};
