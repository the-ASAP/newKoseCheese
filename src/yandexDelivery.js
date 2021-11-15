import React, { useState, useEffect } from 'react';
// import { ymaps, Map, Polygon, SearchControl } from 'react-yandex-maps';

const YandexDelivery = ({ deliveryParams }) => {
  const [coords, setCoords] = useState([
    [55.882453, 37.726268],
    [55.829798, 37.828943],
    [55.81387, 37.839307],
    [55.776965, 37.843213],
    [55.76914, 37.843599],
    [55.76715, 37.843459],
    [55.755311, 37.842912],
    [55.743971, 37.842462],
    [55.74139, 37.842462],
    [55.729773, 37.840841],
    [55.718659, 37.83949],
    [55.711842, 37.837612],
    [55.707838, 37.835531],
    [55.686682, 37.831336],
    [55.656874, 37.839876],
    [55.640379, 37.820188],
    [55.617568, 37.78268],
    [55.591371, 37.729669],
    [55.575349, 37.688267],
    [55.572562, 37.650265],
    [55.573428, 37.635481],
    [55.574477, 37.61927],
    [55.575735, 37.596535],
    [55.580792, 37.572288],
    [55.580433, 37.573951],
    [55.611022, 37.491532],
    [55.615649, 37.486135],
    [55.625624, 37.474495],
    [55.631391, 37.467703],
    [55.638783, 37.459056],
    [55.656307, 37.437952],
    [55.662309, 37.431869],
    [55.668779, 37.426118],
    [55.682621, 37.416301],
    [55.701565, 37.398492],
    [55.713535, 37.385381],
    [55.723509, 37.380371],
    [55.764978, 37.368783],
    [55.770155, 37.369041],
    [55.789806, 37.372517],
    [55.808849, 37.387924],
    [55.815522, 37.389866],
    [55.821097, 37.391293],
    [55.825213, 37.392773],
    [55.830515, 37.394436],
    [55.832786, 37.395166],
    [55.83278, 37.39331],
    [55.834024, 37.395369],
    [55.849635, 37.392194],
    [55.851759, 37.393234],
    [55.858633, 37.397022],
    [55.865276, 37.402386],
    [55.873396, 37.417331],
    [55.876755, 37.42791],
    [55.881888, 37.444851],
    [55.887472, 37.482777],
    [55.908124, 37.543781],
    [55.911056, 37.570046],
    [55.911149, 37.581182],
    [55.910028, 37.588767],
    [55.895786, 37.663247],
    [55.895496, 37.673203],
    [55.891982, 37.707107]
  ]);

  function init() {
    console.log(deliveryParams);
    // searchControl.search('')
    const DELIVERY_TARIFF = 30;
    const MINIMUM_COST = 600;
    let // Точка по клику
      myPlacemark;
    // Замыкание маршрута
    let myRoute;
    const myMap = new ymaps.Map('map', {
      center: [55.73, 37.75],
      zoom: 8,
      behaviors: ['default', 'scrollZoom']
    });
    // отлавливаем Панель поиска
    const searchControl = myMap.controls.get('searchControl');
    // Строим многоугольник
    const myPolygon = new ymaps.geometry.Polygon(
      [coords],
      { pointColor: 'yellow' },
      { strokeColor: 'FFFF00AA' }
    );
    function calculate(routeLength) {
      return Math.max(routeLength * DELIVERY_TARIFF, MINIMUM_COST);
    }
    function Marshrutizator(coordC) {
      if (myPlacemark) {
        // Если точка уже есть перетаскваем ее
        myPlacemark.geometry.setCoordinates(coordC);
      } else {
        // Иначе создаем
        myPlacemark = new ymaps.Placemark(coordC);
        myMap.geoObjects.add(myPlacemark);
      }
      // Создаем Массив координат по кадому кмтру мкада
      const arPlaseMarks = [];
      for (let i = 0; i < coords.length; i += 1) {
        arPlaseMarks[i] = new ymaps.Placemark(coords[i]);
      }
      // делаем точки невидимыми и добавляем на карту
      const rezz = ymaps.geoQuery(arPlaseMarks).addToMap(myMap).setOptions('visible', false);
      // ловим ближайшую точку из массива до поставленной на карту
      const closestObject = rezz.getClosestTo(coordC);
      // Прокладываем маршрут от поставленной точки до найденной ближайшей точки
      ymaps.route([closestObject.geometry.getCoordinates(), coordC]).then((route) => {
        // если точка попадает в полигон выплевываем фиксированный тариф
        if (myPolygon.contains(coordC)) {
          if (myRoute) myMap.geoObjects.remove(myRoute);
          myMap.balloon.open(
            myPlacemark.geometry.getCoordinates(),
            `<span>В пределах МКАД стоимость доставки составит ${MINIMUM_COST} р.</span><br/>` +
              `<span style="font-weight: bold; font-style: italic">При сумме заказа свыше 5000 р. - БЕСПЛАТНО</span>`,
            {
              // Опция: не показываем кнопку закрытия.
              closeButton: true
            }
          );
        } else {
          // иначе перестраиваем маршрут и делаем расчет стоимости по тарифу
          if (myRoute) myMap.geoObjects.remove(myRoute);
          myMap.geoObjects.add((myRoute = route));
          const distance = Math.round(route.getLength() / 1000);
          const price = calculate(distance);
          myMap.balloon.open(
            myPlacemark.geometry.getCoordinates(),
            `<span>Расстояние от МКАД: ${distance} км.</span><br/>` +
              `<span style="font-weight: bold; font-style: italic">Стоимость доставки: ${price} р.</span>`,
            {
              // Опция: не показываем кнопку закрытия.
              closeButton: true
            }
          );
        }
      });
    }

    myPolygon.options.setParent(myMap.options);
    myPolygon.setMap(myMap);
    // по клику на карту
    myMap.events.add('click', (e) => {
      // Координаты
      const coord = e.get('coords');
      // прокладываем маршрут
      Marshrutizator(coord);
    });
    // делаем все тоже самое только по поиску адреса
    searchControl.events.add(
      'resultselect',
      (e) => {
        const coord1 = searchControl.getResultsArray()[0].geometry.getCoordinates();
        // прокладываем маршрут
        Marshrutizator(coord1);
      },
      this
    );
  }
  useEffect(() => {
    if (ymaps) ymaps.ready(init);
  }, []);
  return <div id="map" style={{ height: 300 }} />;
};

export default YandexDelivery;
