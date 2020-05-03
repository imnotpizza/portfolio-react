import React, { useState, useEffect, useCallback } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import NewsList from "./NewsList";
import NewsListContainer from '../containers/NewsListContainer';
import NewsSearchContainer from "../containers/NewsSearchContainer";
import {fetchNewsList, fetchScrapList, fetchAddScrap, fetchDeleteScrap} from '../apis/list';
import ClipLoader from "react-spinners/ClipLoader";
import util from '../utils';
import BgText from './BgText';
import produce from 'immer';
import "../sass/HomeView.scss";

import { tempItems2 } from "../constants";

export const HomeView=({
  query, 
  isLoading,
  setIsLoading,
  isMoreLoading,
  setIsMoreLoading,
  isFirst, 
  setIsFirst,
  tabMode, 
  setTabMode,
  newsItems,

  scrapItems,

  fetchScrapItems,
  fetchMoreNews,
  pageNum,
}) => {

  //const [newsItems, setNewsItems] = useState([]); //뉴스 데이터
  //const [scrapItems, setScrapItems] = useState([]); //스크랩 데이터


  //const [isLoading, setIsLoading] = useState(false); //로딩 플래그
  // const [isMoreLoading, setIsMoreLoading] = useState(false); //추가 데이터 로딩 플래그
  // const [isFirst, setIsFirst] = useState(true); //로딩 플래그
  // const [tabMode, setTabMode] = useState(true); //tabMode
 
  

  //const [pageNum, setPageNum] = useState(0); //페이징 넘버



//페이지 진입시 스크랩 정보 저장
  useEffect(() => {
 
    fetchScrapItems();
   
  },[]);


  //추가 데이터 호출여부 판단
  const shouldLoadMore=()=>{
    if(isFirst || !tabMode){
      return false;

    }else{
      return true;
    }
  }

  const showSearchPage=()=>{
    if(isFirst){
      return(
        <BgText
        main={'찾으시는 기사의 검색어를 입력해보세요'}
        ></BgText>
      )
    }else{
      if(isLoading){
        return  <BgText main={'검색중..'}></BgText>;
      }else{

        return (newsItems.length===0 ? (

          <BgText
          main={'검색 결과가 없습니다'}
          sub={'다시 시도해 주세요!'}
          ></BgText>

          ):(
          <div id="list-container">
            <NewsListContainer
            listItems={newsItems}
            ></NewsListContainer>
          </div>
          )
      )
      }
    }
  }
  const showScrapPage=()=>{
    if(scrapItems.length===0){
      return(
        <BgText
        main={'아직 스크랩된 기사가 없습니다'}
        sub={'관심있는 기사를 검색한 뒤 스크랩해보세요!'}
        ></BgText>

      )
    }else{
      return(
        <div id="list-container">
        <NewsListContainer
        listItems={scrapItems}
        ></NewsListContainer>
        </div>
      )
    }
  }

  //리스트 뷰 컨트롤
  //플래그
  //loading, tabMode, noResults,
  
  return (
      <InfiniteScroll
      dataLength={newsItems.length}
      next={()=>{ console.log(newsItems); fetchMoreNews(query, pageNum, scrapItems, newsItems)}}
      hasMore={shouldLoadMore()}
      scrollThreshold={0.9}
      >
        
        <div>
            <NewsSearchContainer></NewsSearchContainer>
    
            <div id="tabs-container">
              <div
                id={!tabMode ? "tabs-item" : "tabs-item-selected"}
                onClick={() => setTabMode(true)}>

                  <div id={!tabMode ? "tabs-item-text" : "tabs-item-selected-text"}>검색</div>
              </div>

              <div
                id={tabMode ? "tabs-item" : "tabs-item-selected"}
                onClick={() => setTabMode(false)}>

                  <div  id={tabMode ? "tabs-item-text" : "tabs-item-selected-text"}>스크랩</div>
              </div>
            </div>

            {tabMode ? showSearchPage() : showScrapPage()}

        
          {newsItems.length>0 && tabMode &&

             <div align="center">
                 <button 
                   id="btn-load-additional" 
                   onClick={fetchMoreNews}
                   disabled={isMoreLoading}
                   >
                   {isMoreLoading ? '더 불러오는 중' : '결과 더보기'}
                   </button>
             </div>
          

          }

          </div>
      </InfiniteScroll>
  );
};


export default HomeView;