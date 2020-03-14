import axios from "axios";
import { X_NAVER_CLIENT_ID ,  X_NAVER_CLIENT_SECRET} from "../constants";

export default {
  BASE_URL: "http://localhost:3000/api",

  get(path) {
    return axios.get(this.BASE_URL+path);
  },

  post(path, data) {
    return axios.post(this.BASE_URL + "/" + path, data);
  },

  put(path, data) {
    return axios.put(this.BASE_URL + "/" + path, data);
  },

  delete(path) {
    return axios.delete(this.BASE_URL + "/" + path);
  }
};
