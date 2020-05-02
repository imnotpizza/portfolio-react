import React from 'react';
import {connect} from 'react-redux';
import {setQuery} from '../redux/news';
import NewsList from '../views/NewsList';

const mapStateToProps=state=>({
    newsItems: state.news.newsItems,
    scrapItems: state.news.scrapItems,
    tabMode: state.news.tabMode,
})

const NewsSearchContainer=({
   newsItems,
   tabMode,
   scrapItems,
})=>{
    return(
        <NewsList
        newsItems={tabMode ? newsItems : scrapItems}
        ></NewsList>
    )
}

export default connect(
    mapStateToProps,
    {
        setQuery
    }
)(NewsSearchContainer)