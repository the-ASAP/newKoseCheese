import axios from "axios";
import { BASE_URL } from "constants.js";
// import {handleErrorFunc} from '../App';
// import {LOCAL_STORAGE_DATA_NAME} from '../constants'

class API {
  constructor(localStorageData = "") {
    const baseUrlFromLS = BASE_URL;
    this.url = baseUrlFromLS || process.env.REACT_APP_BASE_URL || "";
    // this.localStorageData = localStorageData
  }

  handleSuccess = (response) => {
    const res = response.data;

    // if (res.statusCode && res.statusCode !== 200) {
    //     if (res.statusCode !== 401) {
    //         handleErrorFunc(res?.statusCode, res?.message)
    //     }
    // }

    return response;
  };

  handleError = (error) =>
    // handleErrorFunc(null, error)
    Promise.reject(error);


  create = async (headers) => {
    // const localStorageData = JSON.parse(localStorage.getItem(this.localStorageData))
    // let token = localStorageData?.accessToken

    // const headerAuth = token && {Authorization: token ? `Bearer ${token}` : ''}
    const service = axios.create({
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        ...headers
        // ...headerAuth
      }
    });
    service.interceptors.response.use(this.handleSuccess, this.handleError);
    service.interceptors.request.use(request =>
      // console.log('Starting Request', request)
      request
    );

    service.interceptors.response.use(response =>
      // console.log('Response:', response)
      response
    );

    return service;
  };

  get = async (path = "", headers) => {
    const service = await this.create(headers);

    return service.request({
      method: "GET",
      url: `${this.url}${path}`
    })
      .then(res => res.data)
      .catch(err => this.handleError(err));
  };

  post = async (path = "", data = {}, headers) => {
    const service = await this.create(headers);

    return service.request({
      method: "POST",
      url: `${this.url}${path}`,
      data
    })
      .then(res => res.data)
      .catch(err => this.handleError(err));
  };

  put = async (path = "", data = {}, headers) => {
    const service = await this.create(headers);

    return service.request({
      method: "PUT",
      url: `${this.url}${path}`,
      data
    })
      .then(res => res.data)
      .catch(err => this.handleError(err));
  };

  delete = async (path = "", headers) => {
    const service = await this.create(headers);

    return service.request({
      method: "DELETE",
      url: `${this.url}${path}`
    })
      .then(res => res.data)
      .catch(err => this.handleError(err));
  };


}

export default new API();
