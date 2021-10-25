import React from "react";

import { TabButton } from "components/buttons/TabButton/TabButton";
import { MarketCard } from "components/common/MarketCard/MarketCard";
import { useTabs } from "hooks";
import { YMaps, Map, Placemark, ZoomControl } from "react-yandex-maps";
import { Section } from "components/layout/Section/Section";
import { Wrapper } from "components/layout/Wrapper/Wrapper";
import { cities, isClientSide, windowSize } from "constants.js";
import { Tabs } from "components/layout/Tabs/Tabs";
import { Loading } from "components/common/Loading/Loading";
import { Swiper, SwiperSlide } from "swiper/react";
import s from "./SalePointsSection.module.scss";


export const SalePointsSection = () => {
  const { activeId, toggleActiveId } = useTabs(cities[0].id, false);
  const [activeCity, setActiveCity] = React.useState(
    cities.find((city) => city.id === activeId)
  );
  const [mapLoaded, setMapLoaded] = React.useState(false);

  React.useEffect(() => {
    setActiveCity(cities.find((city) => city.id === activeId));
  }, [activeId]);

  return (
    <Section>
      <Wrapper>
        <Tabs border={"top"}>
          {cities.map(({ title, id }) => (
            <TabButton
              key={id}
              text={title}
              index={id}
              active={activeId}
              toggleActive={toggleActiveId}
              small
            />
          ))}
        </Tabs>
        <div className={s.container}>
          {!mapLoaded && <Loading/>}
          <YMaps>
            <Map
              onLoad={() => setMapLoaded(true)}
              state={{ center: activeCity.cityCoords, zoom: 11 }}
              options={{ controls: ["default"] }}
              className={s.map}
              width="100px"
              instanceRef={(ref) => {
                // eslint-disable-next-line no-unused-expressions
                ref && ref.behaviors.disable("scrollZoom");
              }}
            >
              {activeCity.points.map(({ market, coords, id }) => (
                <Placemark
                  key={id}
                  geometry={coords}
                  modules={["geoObject.addon.hint"]}
                  properties={{ hintContent: market }}
                  options={{ preset: "islands#brownShoppingIcon" }}
                />
              ))}
              <ZoomControl/>
            </Map>
          </YMaps>
        </div>
        {
          isClientSide && windowSize >= 768 ?
          <div className={s.points}>
            {activeCity.points.length > 0 && activeCity.points.map(point =>
              <MarketCard
                key={point.id}
                city={activeCity.title} {...point} />)}
          </div> :
          <Swiper
            slidesPerView={1.35}
            spaceBetween={20}
          >
            {
              activeCity.points.length > 0 && activeCity.points.map(point =>
              <SwiperSlide key={point.phone}>
                <MarketCard
                  city={activeCity.title}
                  {...point}
                />
              </SwiperSlide>)
            }
          </Swiper>
        }
      </Wrapper>
    </Section>
  );
};

