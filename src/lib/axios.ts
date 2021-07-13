import Axios from 'axios';
import { publicConfig } from '../config/public';

export const api = Axios.create({
  baseURL: publicConfig.APIURL
});

api.interceptors.request.use((req) => {
  // req.headers['Authorization'] = ""
  return req;
});

api.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    return Promise.reject(err);
  }
);
