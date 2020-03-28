import axios from "axios";
import { X_NAVER_CLIENT_ID ,  X_NAVER_CLIENT_SECRET} from "../constants";
import { BASE_URL } from '../constants'

export default {


  get(path) {
    return axios.get(BASE_URL+path);
  },

  post(path, data) {
    return axios.post(BASE_URL + "/" + path, data);
  },

  put(path, data) {
    return axios.put(BASE_URL + "/" + path, data);
  },

  delete(path) {
    return axios.delete(BASE_URL + "/" + path);
  }
};
