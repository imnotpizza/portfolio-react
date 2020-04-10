import React, { useState, useEffect, useCallback } from "react";
import NewsList from "./NewsList";
import NewsSearch from "./NewsSearch";
import NoResults from "./NoResults";
import {fetchNewsList, fetchScrapList, fetchAddScrap, fetchDeleteScrap} from '../apis/list';
import util from '../utils';
import "../scss/newsHome.scss";

import { tempItems2 } from "../constants";

export default () => {
  const [newsItems, setNewsItems] = useState([]); //뉴스 데이터
  const [scrapItems, setScrapItems] = useState([]); //스크랩 데이터
  
  const [isLoading, setIsLoading] = useState(false); //로딩 플래그
  const [isFirst, setIsFirst] = useState(true); //로딩 플래그
  const [tabMode, setTabMode] = useState(true); //tabMode



  useEffect(() => {
      fetchScrapItems();
  },[]);


  //검색결과 API 호출 후 데이터 반영 로직
  const fetchNewsItems = useCallback(async (query) => {
      
    try {

        setIsLoading(true);
        setIsFirst(false);

        const _newsItems=await fetchNewsList(query);
    
        setNewsItems(_newsItems);

    } catch (e) {

    alert("API 호출 도중 문제가 발생했습니다.")
      console.log(e);
    } finally {

      setIsLoading(false);
    }

    console.log("search finsihed");
  });


    //스크랩 API 호출 후  반영 로직
  const fetchScrapItems=useCallback(async()=>{

    try {

        setIsLoading(true);
        
        const _scrapItems=await fetchScrapList();
        
        setScrapItems(_scrapItems);

    } catch (e) {

        alert("API 호출 도중 문제가 발생했습니다.")
        console.log(e);
    } finally {

      setIsLoading(false);
    }

  })



  //뉴스 항목 스크랩 추가-news 객체, newsItem의 index
  
  
  const addScrap = useCallback((newsItem, idx) => {

    fetchAddScrap(newsItem)
    .then(res=>{

      const scrapIdx=scrapItems.indexOf(newsItem);//search에서 클릭시
      const searchIdx=newsItems.indexOf(newsItem);//scrap에서 클릭시
      
      //뉴스검색 : isScrap 교체 
      
         
      //검색 데이터 수정
      newsItem.isScrap=true;

      setNewsItems([
        ...newsItems.slice(0, idx),
        newsItem,
        ...newsItems.slice(idx + 1)
      ]);
      
      
      //스크랩 : 해당 항목 스크랩에 추가
  
        //스크랩 데이터 추가
        setScrapItems([
        ...scrapItems,
        newsItem
    ]);

        
       

       

        //뉴스 검색 scrap 데이터 변경 ?
    })
    
  });

  /**
   * 뉴스에서 클릭시 -> 뉴스 : idx, 스크랩 : indexof
   * 스크랩에서 클릭시 -> 뉴스 : 뉴스:indexof, 스크랩: id
   */

  //뉴스 항목 스크랩 삭제 -news 객체, newsItem의 index
  const deleteScrap = useCallback((newsItem, idx) => {
    

    
    fetchDeleteScrap(newsItem.id)
    .then(res=>{

      const scrapIdx=scrapItems.indexOf(newsItem);//search에서 클릭시 설정될 id
      const searchIdx=newsItems.indexOf(newsItem);//scrap에서 클릭시 설정될 id

      
      //뉴스검색 : isScrap 교체 
    

        //검색 데이터 수정
        if(searchIdx>-1){
          newsItem.isScrap=false;
          setNewsItems([
              ...newsItems.slice(0, searchIdx),
              newsItem,
              ...newsItems.slice(searchIdx + 1)
            ]);

        }
                
        //스크랩 : 해당 항목 삭
           const _scrapItems=scrapItems.filter((news, newsId)=>{
            return newsId!==scrapIdx;
        })

        console.log(_scrapItems)
        setScrapItems(_scrapItems)
        
       
     
    
       
        
    })
    
  });

  //대문 페이지 종료후 앱으로 이동
  const startApp = () => {
    isLoading(false);
 
  };




  //리스트 뷰 컨트롤
  //플래그
  //loading, tabMode, noResults,
  const getNewsSearchView = () => {

    return(
        <div id="nav-body">
          <NewsSearch fetchNewsItems={fetchNewsItems}></NewsSearch>
          <div className="tabs">
            <div
              className={!tabMode ? "tabs-search" : "tabs-search-checked"}
              onClick={() => setTabMode(true)}>
            검색
            </div>
    
            <div
              className={tabMode ? "tabs-scrap" : "tabs-scrap-checked"}
              onClick={() => setTabMode(false)}>
            스크랩
            </div>
          </div>
          
          {isFirst && tabMode ? (
              <h1>검색어를 입력하세요</h1>
          ):(
            isLoading ? (
              <h1>로딩중...</h1>
            ):(
              <NewsList
              addScrap={addScrap}
              deleteScrap={deleteScrap}
              newsItems={tabMode ? newsItems : scrapItems}
              ></NewsList>
            )
          )}
        
          <div className="btn-load-additional">데이터 호출</div>
      </div>
    )

  };

  return (
      <>
        {getNewsSearchView()}
      </>
  );
};


export const Loading = () => {
  return (
    <div>
      <h1>로딩중</h1>
    </div>
  );
};
