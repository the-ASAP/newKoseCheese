import API from './APIService';

class MockAPI {
  getData = () => API.get('');
}

export default new MockAPI();
