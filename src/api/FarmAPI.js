import API from './APIService'

class FarmAPI {
  getFarmCategories = () => API.get('farmCategories');

  getPage = (url) => API.get(url);
}

export default new FarmAPI();
