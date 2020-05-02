import React from 'react';
import {connect} from 'react-redux';
import {setQuery, addScrap, deleteScrap} from '../redux/news';
import NewsList from '../views/NewsList';

const mapStateToProps=state=>({
    newsItems: state.news.newsItems,
    scrapItems: state.news.scrapItems,
    tabMode: state.news.tabMode,
})

const NewsSearchContainer=({
   newsItems,
   scrapItems,
   tabMode,
   addScrap,
   deleteScrap,
})=>{
    return(
        <NewsList
        newsItems={tabMode ? newsItems : scrapItems}
        scrapItems={scrapItems}
        addScrap={addScrap}
        deleteScrap={deleteScrap}
        ></NewsList>
    )
}

export default connect(
    mapStateToProps,
    {
        setQuery,
        addScrap,
        deleteScrap,
    }
)(NewsSearchContainer)