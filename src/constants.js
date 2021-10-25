import React from "react";
import * as Yup from "yup";

import {
  RedWine,
  WhiteWine,
  Vegetables,
  Fruits
} from "components/SVG/TastesSVG/TastesSVG";

export const BASE_URL = "https://api.jsonbin.io/b/60f8295399892a4ae9a732dc/8";

export const BASE_API_URL = "https://co-ko.asap-lp.ru/api/";

export const BASE_SITE_URL = "https://co-ko.asap-lp.ru/";
export const allStatus = {
  avaliable: {
    title: "в наличии",
    class: "avaliable"
  },
  preparing: {
    title: "созревает",
    class: "preparing"
  },
  "not-avaliable": {
    title: "нет в наличии",
    class: "not-avaliable"
  }
};

export const allTastes = {
  "red-wine": <RedWine border={"accent"} key={0}/>,
  "white-wine": <WhiteWine border={"accent"} key={1}/>,
  vegetables: <Vegetables border={"accent"} key={2}/>,
  fruits: <Fruits border={"accent"} key={3}/>
};


export const cities = [
  {
    id: 1,
    title: "Москва",
    cityCoords: [55.75322, 37.622513],
    points: [
      {
        id: 1,
        market: "Усачевский рынок",
        coords: [55.727506, 37.567707],
        image: "/static/img/content/marketPoints/usach.jpg",
        phone: "+7 (495) 120-18-01",
        workingTime: "с 08 до 21 часа"
      },
      {
        id: 2,
        market: "Даниловский рынок",
        coords: [55.712117, 37.620555],
        image: "/static/img/content/marketPoints/danil.jpg",
        phone: "+7 (495) 120-18-01",
        workingTime: "с 08 до 22 часов"
      },
      {
        id: 3,
        market: "Черемушкинский рынок",
        coords: [55.683919, 37.550567],
        image: "/static/img/content/marketPoints/chermush.jpg",
        phone: "+7 (495) 120-18-01",
        workingTime: "с 08 до 20 часов"
      }
    ]
  },
  {
    id: 2,
    title: "Екатеринбург",
    cityCoords: [56.838011, 60.597474],
    points: [
      {
        id: 1,
        market: "Свердловский рынок",
        coords: [56.838011, 60.597474],
        image: "/static/img/content/marketPoints/usach.jpg",
        phone: "+7 (495) 120-18-01",
        workingTime: "с 08 до 21 часа"
      }
    ]
  },
  {
    id: 3,
    title: "Арамиль",
    cityCoords: [56.694568, 60.834342],
    points: [
      {
        id: 1,
        market: "Арамильcкий рынок",
        coords: [56.694568, 60.834342],
        image: "/static/img/content/marketPoints/chermush.jpg",
        phone: "+7 (495) 120-18-01",
        workingTime: "с 08 до 21 часа"
      }
    ]
  }
];


export const subscribeDays = [{
  name: "Понедельник",
  index: 0
}, {
  name: "Вторник",
  index: 1
}, {
  name: "Среда",
  index: 2
}, {
  name: "Четверг",
  index: 3
}, {
  name: "Пятница",
  index: 4
}, {
  name: "Суббота",
  index: 5
}, {
  name: "Воскресенье",
  index: 6
}];


export const instagramUser = "ko-cheese";

export const PROFILE_VALIDATION_SCHEMA = Yup.object().shape({
  name: Yup.string().required("Введите имя").nullable(true),
  surname: Yup.string().nullable(true),
  email: Yup.string().email("Введите корректный e-mail").nullable(true),
});


export const ADDRESS_VALIDATION_SCHEMA = Yup.object().shape({
  city: Yup.string().required("Введите город"),
  street: Yup.string().required("Введите улицу"),
  house: Yup.string().required("Введите дом")
});


export const RETURN_ORDER_VALIDATION_SCHEMA = Yup.object().shape({
  name: Yup.string().required("Введите имя"),
  phone: Yup.string().required("Введите номер телефона")

});

export const RETURN_VALIDATION_SCHEMA = Yup.object().shape({
  name: Yup.string().required("Введите имя"),
  phone: Yup.string().required("Введите номер телефона")
});

export const PURCHASE_VALIDATION_SCHEMA = Yup.object().shape({
  name: Yup.string().required("Введите имя"),
  phone: Yup.string().required("Введите номер телефона"),
  email: Yup.string().email("Введите корректный e-mail")
});

export const DELIVERY_VALIDATION_SCHEMA = Yup.object().shape({
  city: Yup.string().required("Введите город"),
  street: Yup.string().required("Введите улицу"),
  house: Yup.string().required("Введите номер дома")
});

export const EMPTY_VALIDATION_SCHEMA = Yup.object().shape({})

export const AUTH_VALIDATION_SCHEMA = Yup.object().shape({
  phone: Yup.string().min(16, 'Проверьте правильность введенного номера')
  .max(16, 'Проверьте правильность введенного номера'),
  policy: Yup.bool().oneOf([true], "Пожалуйста, ознакомьтесь с политикой конфиденциальности")
});

export const mainModalProperties = {
  animation: {
    animationShow: "moveFromRight",
    animationHide: "moveToRight"
  },
  classes: {
    boxClass: "modalBox",
    containerClass: "modalContainer"
  }
};

export const mainPopupProperties = {
  animation: {
    animationShow: "fadeIn",
    animationHide: "fadeOut"
  },
  classes: {
    boxClass: "modalBox",
    containerClass: "popupContainer"
  }
};


export const isClientSide = typeof window !== "undefined";

export const windowSize = isClientSide ? window.innerWidth : false;


export const orders = [
  {
    number: 234519,
    totalPrice: 2245,
    count: 2,
    status: "Завершен",
    date: "12.04.2021",
    products: [
      {
        image: "/static/img/content/camamberGoat.png",
        name: "Камамбер козий",
        addition: "с белой плесенью",
        price: 320,
        weight: "200 гр.",
        count: 2
      },
      {
        image: "/static/img/content/camamberCow.png",
        name: "Камамбер коровий",
        addition: "с белой плесенью",
        price: 350,
        weight: "300 гр.",
        count: 5
      }
    ]
  }
];
