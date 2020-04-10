import base from './base';
import { BASEURL } from '../constants'

export const fetch_movielist=(query)=>{
    return base.post(`movie?query=${query}`)
    .then(response=>{
        
        return response;
    })
    .catch(err=>{
        //console.log(err)
        alert("정보를 불러오는 도중 문제가 발생했습니다");
    })
}

//뉴스 api 검색 호출
export const fetchNewsList=query=>{
    return base.post(`search?query=${query}`)
    .then(response=>{
        console.log(response)
        return response.data;
    })
}

//스크랩 api 호출
export const fetchScrapList=query=>{
    return base.get(`/scrap`)
    .then(response=>{
        let resList=response.data.rows;

        return resList.map(res=>{
            return{
                ...res,
                isScrap: true,
            }
        })
        return resList;
    })
}

//스크랩 추가
export const fetchAddScrap=newsItem=>{
    return base.post('scrap', newsItem)
    .then(res=>{
        alert('success')
        return res;
    })
    .catch(e=>{
        alert('error')
        console.log(e);
    })

}

//스크랩 삭제
export const fetchDeleteScrap=id=>{
    return base.delete(`scrap/${id}`)
    .then(res=>{
        alert('success')
        return res;
    })
    .catch(e=>{
        alert('error')
        console.log(e);
    })
}

