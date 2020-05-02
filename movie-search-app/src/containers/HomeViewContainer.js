import React from 'react';
import {connect} from 'react-redux';
import {
    setNewsItems, 
    setIsLoading, 
    setIsMoreLoading, 
    setIsFirst, 
    setTabMode, 
    fetchScrapItems, 
    setScrapItems,
    fetchNewsItems
} from '../redux/news';
import HomeView from '../views/HomeView';


//state 선언
const mapStateToProps=state=>({
    newsItems: state.news.newsItems,//검색목록
    scrapItems: state.news.scrapItems,//스크랩목록
    query: state.news.query,//검색어

    isLoading: state.news.isLoading,
    isMoreLoading: state.news.isMoreLoading,
    isFirst: state.news.isFirst,
    tabMode: state.news.tabMode,
})

//컨테이너 컴포넌트로 적용할 컴포넌트를 감쌈
const HomeViewContainer=({
    newsItems,
    setNewsItems,
    scrapItems,
    setScrapItems,
    query,

    isLoading,
    setIsLoading,
    isFirst,
    setIsFirst,
    isMoreLoading,
    setIsMoreLoading,
    tabMode,
    setTabMode,
    fetchScrapItems,
    fetchNewsItems,

})=>{
    return(
        <HomeView
        newsItems={newsItems}
        setNewsItems={setNewsItems}
        scrapItems={scrapItems}
        setScrapItems={setScrapItems}
        query={query}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        isFirst={isFirst}
        setIsFirst={setIsFirst}
        isMoreLoading={isMoreLoading}
        setIsMoreLoading={setIsMoreLoading}
        tabMode={tabMode}
        setTabMode={setTabMode}
        fetchScrapItems={fetchScrapItems}
        fetchNewsItems={fetchNewsItems}
        
        ></HomeView>
    )
}


export default connect(
    mapStateToProps,
    {
        setNewsItems,
        setScrapItems,
        setIsFirst,
        setIsLoading,
        setIsMoreLoading,
        setTabMode,
        fetchScrapItems,
        fetchNewsItems
    }
)(HomeViewContainer)