import base from './base';
import { BASEURL } from '../constants'

export const fetch_movielist=(query)=>{
    return base.post(`movie?query=${query}`)
    .then(response=>{
        console.log(response)
        return response;
    })
    .catch(err=>{
        console.log(err)
        alert("정보를 불러오는 도중 문제가 발생했습니다");
    })
}

