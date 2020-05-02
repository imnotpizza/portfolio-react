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
  setNewsItems,
  scrapItems,
  setScrapItems,
  fetchScrapItems,
 
}) => {

  //const [newsItems, setNewsItems] = useState([]); //뉴스 데이터
  //const [scrapItems, setScrapItems] = useState([]); //스크랩 데이터


  //const [isLoading, setIsLoading] = useState(false); //로딩 플래그
  // const [isMoreLoading, setIsMoreLoading] = useState(false); //추가 데이터 로딩 플래그
  // const [isFirst, setIsFirst] = useState(true); //로딩 플래그
  // const [tabMode, setTabMode] = useState(true); //tabMode
 
  

  const [pageNum, setPageNum] = useState(0); //페이징 넘버



//페이지 진입시 스크랩 정보 저장
  useEffect(() => {
 
    fetchScrapItems();
   
  },[]);

  useEffect(()=>{
    console.log(newsItems)
  },[newsItems])

  

  //검색결과 API 호출 후 데이터 반영 로직
  const fetchNewsItems22 = useCallback(async (query) => {
      
    try {
        
        setIsLoading(true);//로딩 ui 활성화
        setIsFirst(false);//검색 안함 플래그 비활성화

        const _newsItems=await fetchNewsList(query, 0, scrapItems);

        setNewsItems(_newsItems);
        
        setPageNum(0);

    } catch (e) {

      alert("API 호출 도중 문제가 발생했습니다.")
      console.log(e);
    } finally {

      setIsLoading(false);//로딩 ui 비활성화
    }

   
  },[newsItems]);

 

  //추가 데이터 로딩 200회까지
  const fetchMoreNews=useCallback(async ()=>{
    try{
      
      setIsMoreLoading(true);
      const _newsItems=await fetchNewsList(query, pageNum+1, scrapItems);    

      setNewsItems([
        ...newsItems,
        ..._newsItems
      ]);
      
      setPageNum(pageNum+1);

    }catch(e){
      alert("API 호출 도중 문제가 발생했습니다.")
      console.log(e);
    }finally{
      setIsMoreLoading(false);
    }
  })


  //   //스크랩 API 호출 후  반영 로직
   const fetchScrapItems22=useCallback(async()=>{
     try {

     
         const _scrapItems=await fetchScrapList();
     
         setScrapItems(_scrapItems);
     } catch (e) {
         alert("API 호출 도중 문제가 발생했습니다.")
         console.log(e);
     } finally {
     }
   })
   const loadMore=()=>{
     alert('loading')
   }



  //뉴스 항목 스크랩 추가-news 객체, newsItem의 index
  
  
  const addScrap = useCallback((newsItem, idx) => {

  
    if (window.confirm("해당 기사를 스크랩 목록에 저장하시겠습니까?") != 0) {

      
        fetchAddScrap(newsItem)
      .then(res=>{
   
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
        
      })
      .catch(e=>{
        alert("스크랩 저장 중 문제가 발생했습니다.")
      })
    }

  
    
  });

  /**
   * 뉴스에서 클릭시 -> 뉴스 : idx, 스크랩 : indexof
   * 스크랩에서 클릭시 -> 뉴스 : 뉴스:indexof, 스크랩: id
   */

  //뉴스 항목 스크랩 삭제 -news 객체, newsItem의 index
  const deleteScrap = useCallback((newsItem, idx) => {
    
    if (window.confirm("해당 기사를 스크랩 목록에서 삭제하시겠습니까?") != 0) {
    
        fetchDeleteScrap(newsItem.id)
        .then(res=>{

          let scrapIdx=0; 
          let searchIdx=0;

          for(let i=0;i<scrapItems.length; i++){

             if(scrapItems[i].id===newsItem.id){
               scrapIdx=i;
               break;
             }
          }

          
          for(let i=0;i<newsItems.length; i++){

            if(newsItems[i].id===newsItem.id){
              searchIdx=i;
              break;
            }
         }


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
        
      }
      
    
  });
  //추가 데이터 호출여부 판단
  const shouldLoadMore=()=>{
    if(isFirst || !tabMode){
      return false;

    }else{
      return true;
    }
  }


  //대문 페이지 종료후 앱으로 이동
  const startApp = () => {
    isLoading(false);
 
  };

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
            addScrap={addScrap}
            deleteScrap={deleteScrap}
           
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
        addScrap={addScrap}
        deleteScrap={deleteScrap}
       
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
      dataLength={newsItems===undefined ? 0 : newsItems.length}
      next={fetchMoreNews}
      hasMore={shouldLoadMore()}
      scrollThreshold={0.9}
      >
        
        <div>
            <NewsSearchContainer isLoading={isLoading}></NewsSearchContainer>
            {newsItems.length}
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