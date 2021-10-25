import axios from "axios";

class APITest {
  getData = (url) => axios.get(`http://192.168.1.141/api/${url}`).then(res => res.data);
  // getCategories = () => API.get('articlesCategories');
  //
  // getPosts = (url) => API.get(url);
  //
  // getPost = (url, id) => API.get(`${url}/${id}`);
}

export default new APITest();
