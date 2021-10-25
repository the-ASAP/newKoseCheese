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
    isGallery: true,
  }
};

export const GallerySection = ({ pageData: { gallery } }) => {
  return (
    <Section>
      <Wrapper>
        <h2 className={s.title}>Галлерея</h2>
        <Slider params={sliderParams} slides={gallery}>
          <ImageSlide/>
        </Slider>
      </Wrapper>
    </Section>

  );
};


