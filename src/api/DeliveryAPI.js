import API from './APIService'

class DeliveryAPI {
  getDeliveryData = () => API.get('delivery');
}

export default new DeliveryAPI();
