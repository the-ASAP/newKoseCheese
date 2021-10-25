import React from "react";

import { Slider } from "components/common/Slider/Slider";
import { Section } from "components/layout/Section/Section";
import { Wrapper } from "components/layout/Wrapper/Wrapper";
import { windowSize } from "constants.js";
import { NewTaste } from "../../../common/NewTaste/NewTaste";

const sliderParams = {
  slider: {
    slidesPerView: "auto",
    turnOffAutoSlides: 767,
    spaceBetween: 20,
    slideClass: "newTaste",
    breakpoints: {
      767: {
        slidesPerView: 2,
        slidesPerGroup: 2
      },
      1023: {
        slidesPerView: 3,
        slidesPerGroup: 3
      },
      1201: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 50
      }
    }
  },
  nav: {
    counter: true,
    counterBottom: windowSize <= 1200
  }
};

export const NewTastesSection = ({ newProducts }) => {
  return (
    <Section>
      <Wrapper>
        <Slider
          title="Новые вкусы"
          slides={newProducts}
          params={sliderParams}
        >
          <NewTaste/>
        </Slider>
      </Wrapper>
    </Section>
  );
};


