import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Controller } from "swiper";
import { SliderNav } from "components/common/Slider/SliderNav/SliderNav";

import { windowSize } from "constants.js";
import { useClientSide } from "hooks.js";
import s from "./Slider.module.scss";

export const Slider = ({ children, slides, params, title }) => {
  SwiperCore.use([Navigation]);
  const { sliderClass, slideClass, turnOffAutoSlides, ...restParams } = params.slider;
  const [allPages, setAllPages] = React.useState(null);
  const prevRef = React.useRef(null);
  const nextRef = React.useRef(null);
  const [currentCount, setCurrentCount] = React.useState(1);
  const isSlideWidthAuto = params.slider.slidesPerView === "auto" && windowSize <= turnOffAutoSlides;
  const allCount = Math.ceil(isSlideWidthAuto ? slides.length : (slides.length / allPages || 1));
  const isClientSide = useClientSide();
  return (
    isClientSide && (<div className={s.container}>
      {params.nav && <SliderNav
        title={title}
        prev={prevRef}
        next={nextRef}
        allCount={allCount}
        currentCount={currentCount}
        params={params.nav}
      />}
      <Swiper
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          !allPages && setAllPages(swiper.params.slidesPerView);
          swiper.navigation.update();
        }}
        navigation
        onSlideChange={(e) => setCurrentCount(++e.snapIndex)}
        speed={500}
        className={s[sliderClass]}
        {...restParams}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i} className={s[slideClass]}>
            {React.cloneElement(children, { ...slide })}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>)
  );
};
