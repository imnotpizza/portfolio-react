import base from "./base";
import { BASEURL } from "../constants";

export const fetch_movielist = (query) => {
  return base
    .post(`movie?query=${query}`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
  
      alert("정보를 불러오는 도중 문제가 발생했습니다");
    });
};

//뉴스 api 검색 호출
export const fetchNewsList = (query, pageNum, scrapItems) => {
  return base.post(`search?query=${query}&pageNum=${pageNum}`)
    .then((response) => {
      let newsItems = response.data;
    
      if(scrapItems.length>0){
        for(let item of newsItems){
          let _isScrap = false;
  
          for (let scrap of scrapItems) {
            if(item.id===scrap.id){
              _isScrap=true;
              //console.log(item.id, scrap.id);
              break;
            }
           
          }
      
          item.isScrap = _isScrap;
        }
      }
     
      return newsItems;
    });
};

//스크랩 api 호출
export const fetchScrapList = (query) => {
  return base.get(`/scrap`).then((response) => {
    let resList = response.data.rows;
    return resList.map((res) => {
      return {
        ...res,
        isScrap: true,
      };
    });

  });
};

//스크랩 추가
export const fetchAddScrap = (newsItem) => {
  
    return base
      .post("scrap", newsItem)
      .then((res) => {
        return res;
      })
      .catch((e) => {
        alert("스크랩 저장 중 문제가 발생했습니다.");
      });
  
};

//스크랩 삭제
export const fetchDeleteScrap = (id) => {
  
    return base
      .delete(`scrap/${id}`)
      .then((res) => {
        return res;
      })
      .catch((e) => {
        alert("스크랩 삭제 중 문제가 발생했습니다.");
      });
  
};
