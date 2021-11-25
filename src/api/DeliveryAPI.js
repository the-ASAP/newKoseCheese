import API from './APIService';

// TODO: Видимо это класс тоже стоит удалить
class DeliveryAPI {
  getDeliveryData = () => API.get('delivery');
}

export default new DeliveryAPI();
