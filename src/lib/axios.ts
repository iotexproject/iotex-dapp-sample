import Axios from 'axios';
import { publicCOnfig } from '../config/public';

export const api = Axios.create({
  baseURL: publicCOnfig.APIURL
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
