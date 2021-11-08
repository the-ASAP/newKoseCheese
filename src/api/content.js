import API from './APIBitrix';

class Delivery {
  getDeliveryItems = () => API.get(`content/info-page/categories/`);

  getDeliveryContent = (id) => API.post(`content/info-page/items/${id}`);
}
export const delivery = new Delivery();
