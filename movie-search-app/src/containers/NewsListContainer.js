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
   listItems,
})=>{
    return(
        <NewsList
        newsItems={newsItems}
        scrapItems={scrapItems}
        addScrap={addScrap}
        deleteScrap={deleteScrap}
        listItems={listItems}
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