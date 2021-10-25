import React from "react";
import clsx from "clsx";
import { BASE_SITE_URL } from "constants.js";
import { ZoomImage } from "components/common/ZoomImage/ZoomImage";
import { Swiper, SwiperSlide } from "swiper/react";
import s from "./Thumbnails.module.scss";
import { getOffsetTop } from "functions";

export const Thumbnails = ({ gallery }) => {

  const [init, setInit] = React.useState(false);
  const [objectProperties, setObjectProperties] = React.useState({});
  const [activeMain, setActiveMain] = React.useState(`${BASE_SITE_URL}${gallery[0]}`);
  const [activeMini, setActiveMini] = React.useState(0);


  const [isSticky, setIsSticky] = React.useState(false);

  const containerRef = React.useRef(null);

  const switchImageHandler = (image, i) => {
    setActiveMain(`${BASE_SITE_URL}${image}`);
    setActiveMini(i);
  };

  const scrollHandler = () => {
    setObjectProperties((prevState => ({
      ...prevState,
      top: containerRef.current?.getBoundingClientRect().top + getOffsetTop()
    })));
  }

  React.useEffect(() => {
    // setActiveMain(`${BASE_SITE_URL}${gallery[0]}`);
    setInit(true);
    setObjectProperties({
      width: containerRef.current?.clientWidth,
      height: containerRef.current?.clientHeight,
      left: containerRef.current?.getBoundingClientRect().left,
      top: containerRef.current?.getBoundingClientRect().top + getOffsetTop()
    });

    // используем observer для отслеживания
    // изменения положения превью
    const cachedRef = containerRef.current;
    const observer = new IntersectionObserver(
      ([e]) => setIsSticky(e.intersectionRatio < 1),
      { threshold: [1] }
    );

    observer.observe(cachedRef);


    window.addEventListener("scroll", scrollHandler);

    return function() {
      observer.unobserve(cachedRef);
      window.removeEventListener("scroll", scrollHandler);
    };

  }, []);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      scrollHandler();
    }, 300);

    return () => window.clearTimeout(timeout);

  }, [isSticky]);


  React.useEffect(() => {
    setActiveMini(0);
    setActiveMain(`${BASE_SITE_URL}${gallery[0]}`);
  }, [gallery]);



  return (
    <div className={s.container}>
      <div ref={containerRef} className={s.main}>
        <img src={activeMain} alt=""/>
        {
          init &&
          <ZoomImage image={activeMain} objectProperties={objectProperties}/>
        }
      </div>
      <div className={s.preview}>
        <Swiper
          slidesPerView={"auto"}
          slidesPerGroup={1}
          spaceBetween={10}
        >
          {gallery.map((image, i) => (
            <SwiperSlide key={i} style={{
              width: "auto"
            }}>
              <img
                className={clsx(s.mini, i === activeMini ? s.active : "")}
                src={`${BASE_SITE_URL}${image}`}
                alt="a"
                onClick={() => switchImageHandler(image, i)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
