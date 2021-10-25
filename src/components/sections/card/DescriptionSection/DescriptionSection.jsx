import React from "react";
import clsx from "clsx";
import parse from "html-react-parser";

import Accordion from "components/common/Accordion/Accordion";
import { BackButton } from "components/buttons/BackButton/BackButton";
import { Thumbnails } from "components/common/Thumbnails/Thumbnails";
import { PurchaseControl } from "components/common/PurchaseControl/PurchaseControl";
import { ProductProperty } from "components/Product/ProductProperty/ProductProperty";
import { allTastes, windowSize, BASE_SITE_URL } from "constants.js";
import SwiperCore, {
  Pagination
} from "swiper/core";

import { ProductNutrient } from "components/Product/ProductNutrient/ProductNutrient";
import { Swiper, SwiperSlide } from "swiper/react";
import { useClientSide } from "hooks";
import s from "./DescriptionSection.module.scss";

const defaults = {
  name: "",
  addition: "",
  detailText: "",
  discount: "10%",
  nutritional: [],
  producer: "",
  tastes: [],
  weight: 0,
  price: 0,
  gallery: [],
  status: false,
  count: 1,
  date: "",
  previewText: "",
  quantity: 1,
  compose: "молоко козье пастеризованное, закваска (мезофильные молочнокислые микроорганизмы), пищевая соль, молокосвёртывающий ферментный препарат животного происхождения.",
  storage: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias cumque deserunt enim expedita ipsa iure maxime reiciendis tempora veniam voluptatem.\n"
};

export const DescriptionSection = ({ id, product }) => {
  SwiperCore.use([Pagination]);
  const properties = {
    ...defaults,
    ...product
  };
  const {
    name,
    addition,
    detailText,
    producer,
    nutritional,
    weight,
    previewText,
    price,
    discount,
    tastes,
    gallery,
    compose,
    storage,
    status,
    count
  } = properties;

  const newPrice = parseInt(price, 10) - parseInt(price, 10) * parseInt(discount, 10) / 100;

  const isClientSide = useClientSide();

  // const productProperties =
  //   <div className={s.properties}>
  //     <div className={s.column}>
  //       {info.map(property => <ProductProperty key={property.id} {...property}/>)}
  //       <ProductProperty title="Вес" value={weight}/>
  //     </div>
  //   </div>;
  return (
    <>
      <BackButton/>
      <div className={s.container}>
        <div className={s.block}>
          {
            isClientSide && windowSize >= 768 ?
              <Thumbnails gallery={gallery}/>
              :
              <div className={s.slider}>
                <Swiper
                  className="swiper-product"
                  spaceBetween={15}
                  pagination
                >
                  {gallery.map(el =>
                    <SwiperSlide key={el}>
                      <img className={s.slide} src={BASE_SITE_URL + el} alt={name}/>
                    </SwiperSlide>)}
                </Swiper>
              </div>
          }
          {/*{isClientSide && windowSize >= 768 && productProperties}*/}
          <div className={s.compose}>
            <div className={s.composeWrapper}>
              <span className={s.composeProperty}>Состав: </span>
              <p className={s.composeText}>{compose}</p>
            </div>
          </div>

        </div>
        <div className={s.info}>
          <h2 className={s.title}>
            {name}
            <br/>
            {addition}
          </h2>
          {
            producer &&
            <div className={s.producer}>
              <span className={s.producerProperty}>Производитель: </span>
              <span className={s.producerValue}>{producer}</span>
            </div>
          }
          {
            discount &&
            <div className={s.discount}>
              <span>На этот заказ у вас скидка </span>
              <span>-{discount}</span>
            </div>
          }
          <div className={s.statuses}>
          <span className={clsx(s.status, status && count > 0 ? s.inStock : s.outStock)}>
            {status && count > 0 ? "в наличии" : "нет в наличии"}
            {/*{count > 0 && ` ${count}  шт `}*/}
            {/*{date && `до ${date}`}*/}
          </span>
          </div>
          <div className={s.price}>
            {
              newPrice &&
              <span className={s.newPrice}>{newPrice} руб.</span>
            }
            <span className={newPrice ? s.oldPrice : s.commonPrice}>{parseInt(price, 10)} руб.</span>
          </div>
          <span className={s.weight}><span className={s.weightProperty}>Вес:</span> {weight} г.</span>
          {/*{*/}
          {/*  isClientSide && windowSize <= 768 &&*/}
          {/*  productProperties*/}
          {/*}*/}
          <p className={s.about}>{parse(previewText)}</p>
          <div className={s.nutrients}>
            {nutritional.map(nutrient => <ProductNutrient key={nutrient.id} {...nutrient}/>)}
          </div>
          {/*{*/}
          {/*  tastes.length && <>*/}
          {/*  <span className={s.with}>С чем употребляют</span>*/}
          {/*  <div className={s.tastes}>*/}
          {/*    {tastes.map((taste, index) => <span key={index} title="Подпись вкуса">{allTastes[taste]}</span>)}*/}
          {/*  </div>*/}
          {/*</>*/}
          {/*}*/}
          <PurchaseControl product={properties} id={id} cart={false}/>
          <div className={s.composition}>
            {
              detailText &&
              <Accordion title={"Описание"}>
                {parse(detailText)}
              </Accordion>
            }
            {
              storage &&
              <Accordion title={"Особенности хранения"}>
                {parse(storage)}
              </Accordion>
            }
          </div>
        </div>
      </div>
    </>
  );
};
