import axios from "axios";
import { X_NAVER_CLIENT_ID ,  X_NAVER_CLIENT_SECRET} from "../constants";
//import { BASE_URL } from '../constants'

const BASE_URL= process.env.REACT_APP_BASEURL;

export default {
  

  get(path) {
    return axios.get(BASE_URL+path)
    .catch(err=>{
      
      if(!err.response){
        alert("현재 서버 점검중입니다. 나중에 다시 시도해주세요")
      }
  
    })
  },

  post(path, data) {
    return axios.post(BASE_URL + "/" + path, data)
   
  },

  put(path, data) {
    return axios.put(BASE_URL + "/" + path, data);
  },

  delete(path) {
    return axios.delete(BASE_URL + "/" + path);
  }
};
