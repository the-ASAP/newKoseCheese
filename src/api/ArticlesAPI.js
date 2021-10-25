import API from './APIService';

class ArticlesAPI {
  getCategories = () => API.get('articlesCategories');

  getPosts = (url) => API.get(url);

  getPost = (url, id) => API.get(`${url}/${id}`);
}

export default new ArticlesAPI();
