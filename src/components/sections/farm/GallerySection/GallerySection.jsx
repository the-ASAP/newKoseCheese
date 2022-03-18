import React from "react";

import { Section } from "components/layout/Section/Section";
import { Wrapper } from "components/layout/Wrapper/Wrapper";
import { Slider } from "components/common/Slider/Slider";
import { ImageSlide } from "components/common/ImageSlide/ImageSlide";
import s from "./GallerySection.module.scss";

const sliderParams = {
  slider: {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 20,
    slideClass: "recipe_slide"

  },
  nav: {
    counter: true,
    // isGallery: true,
  }
};

export const GallerySection = ({ pageData }) => {
  const { slider_gallery } = pageData

  return (
    <Section>
      <Wrapper additionClass={"slider90"}>
        {slider_gallery && <Slider title={"Галерея"} params={sliderParams} slides={slider_gallery}>
          <ImageSlide />
        </Slider>}
      </Wrapper>
    </Section>

  );
};
