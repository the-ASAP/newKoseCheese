import React from "react";
// eslint-disable-next-line import/extensions
import { InstagramAPI } from "api/InstagramAPI.js";
import { Instagram } from "components/common/Instagram/Instagram";
import { Section } from "components/layout/Section/Section";
import { Wrapper } from "components/layout/Wrapper/Wrapper";
import { Slider } from "components/common/Slider/Slider";
import s from "./InstagramSection.module.scss";

const sliderParams = {
  slider: {
    slidesPerView: "auto",
    spaceBetween: 12,
    slideClass: "instagram",
    breakpoints: {
      767: {
        slidesPerView: 3
      },
      1023: {
        slidesPerView: 4,
        spaceBetween: 20,
      }
    }
  }
};

export const InstagramSection = () => {
  const [photos, setPhotos] = React.useState([]);

  // eslint-disable-next-line no-return-await
  const getInstagramData = async () => await InstagramAPI();

  React.useEffect(() => {
    getInstagramData().then((res) => setPhotos(res));
  }, []);

  return (
    <Section>
      <Wrapper>
        <div className={s.container}>
          {photos.length > 0 && <Slider slides={photos} params={sliderParams}>
            <Instagram/>
          </Slider>}
        </div>
      </Wrapper>
    </Section>
  );
};

//
// {photos.map(
// // // eslint-disable-next-line camelcase
// // ({ permalink, media_url, caption, timestamp, thumbnail_url }, i) =>
// //   i < 4 && (
//
// // )
// )}