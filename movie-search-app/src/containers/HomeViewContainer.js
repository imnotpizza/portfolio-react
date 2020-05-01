import React from 'react';
import {connect} from 'react-redux';
import {getNewsItems, startLoading, endLoading} from '../redux/news';
import HomeView from '../views/HomeView';

const mapStateToProps=state=>({
    isLoading2: state.news.isLoading2,//로딩플래그
    newsItems: state.news.newsItems,//검색목록
    scrapList: state.news.scrapList,//스크랩목록
    query: state.news.query,//검색어
})


const HomeViewContainer=({
    isLoading2,
    startLoading,
    endLoading,

    newsItems,
    getNewsItems,
    scrapList,
    query,
})=>{
    return(
        <HomeView
        isLoading2={isLoading2}
        startLoading={startLoading}
        endLoading={endLoading}
        newsItems={newsItems}
        getNewsItems={getNewsItems}
        scrapList={scrapList}
        query={query}
        ></HomeView>
    )
}


export default connect(
    mapStateToProps,
    {
        startLoading,
        endLoading,
        getNewsItems,
    }
)(HomeViewContainer)