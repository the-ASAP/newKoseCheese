import API from './APIService';

// TODO: Пока что понятия не имею, что он делает
class FarmAPI {
  getFarmCategories = () => API.get('farmCategories');

  getPage = (url) => API.get(url);
}

export default new FarmAPI();
