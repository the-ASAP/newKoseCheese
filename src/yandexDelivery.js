import React, { useEffect } from 'react';
// import { ymaps, Map, Polygon, SearchControl } from 'react-yandex-maps';

//TODO: Починить яндекс распределение
const YandexDelivery = ({ deliveryParams, setCost, setDeliveryDistance }) => {
  const coords = [
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
  ];

  function init() {
    const geocodeParams = fetch(
      `https://geocode-maps.yandex.ru/1.x/?apikey=22831a61-cd4e-43d4-a56e-13b907784078&format=json&geocode=${deliveryParams.join(
        ','
      )}`
    );
    geocodeParams
      .then((data) => data.json())
      .then(({ response }) => {
        if (response?.GeoObjectCollection?.featureMember.length === 0)
          return setCost('Адреса не существует');
        const resPoints =
          response?.GeoObjectCollection?.featureMember[0]?.GeoObject?.Point?.pos || '';
        if (response?.GeoObjectCollection?.featureMember[0]?.GeoObject?.Point?.pos)
          return getDeliveryCost(resPoints.split(' ').reverse());
        return setCost('Стоимость доставки уточняется у менеджера');
      });

    const calculateDeliveryResult = (value) => {
      if (value === 0) {
        setCost('Доставка:  Бесплатно');
      } else if (value < 10) {
        setCost(150);
      } else if (value < 20) {
        setCost(350);
      } else if (value < 30) {
        setCost(550);
      } else {
        setCost('Стоимость доставки уточняется у менеджера');
      }
      if (typeof value === 'number') {
        setDeliveryDistance(value);
      } else {
        setDeliveryDistance(null);
      }
    };
    let distance;
    // Создание карты яндекс
    const myMap = new ymaps.Map('map', {
      center: [55.73, 37.75],
      zoom: 8,
      behaviors: ['default', 'scrollZoom']
    });
    const polygon = new ymaps.Polygon([coords]);
    myMap.geoObjects.add(polygon);
    myMap.setBounds(polygon.geometry.getBounds());
    const getDeliveryCost = (place) => {
      const initialMarks = [];
      for (let i = 0; i < coords.length; i++) {
        initialMarks[i] = new ymaps.Placemark(coords[i]);
      }
      // делаем точки невидимыми и добавляем на карту
      const marks = ymaps.geoQuery(initialMarks).addToMap(myMap).setOptions('visible', false);
      // ловим ближайшую точку из массива до поставленной на карту
      const closestObject = marks.getClosestTo(place);
      ymaps.route([closestObject.geometry.getCoordinates(), place]).then((route) => {
        distance = Math.round(route.getLength() / 1000);
        if (polygon.geometry.contains(place)) {
          calculateDeliveryResult(0);
        } else {
          calculateDeliveryResult(distance);
        }
      });
    };
  }

  useEffect(() => {
    if (ymaps || deliveryParams?.length) ymaps.ready(init);
  }, [deliveryParams]);
  return <div id="map" style={{ height: 0, opacity: 0, visibility: 'hidden' }} />;
};

export default YandexDelivery;
