import React from 'react';
import {connect} from 'react-redux';
import {fetchNewsItems, setQuery} from '../redux/news';
import NewsSearch from '../views/NewsSearch';

const mapStateToProps=state=>({
    query: state.news.query,
    scrapItems: state.news.scrapItems,
    isLoading: state.news.isLoading,
})

const NewsSearchContainer=({
    query,
    setQuery,
    fetchNewsItems,
    isLoading,
    scrapItems,
})=>{
    return(
        <NewsSearch
        query={query}
        setQuery={setQuery}
        scrapItems={scrapItems}
        fetchNewsItems={fetchNewsItems}
        isLoading={isLoading}
        ></NewsSearch>
    )
}

export default connect(
    mapStateToProps,
    {
        setQuery,
        fetchNewsItems,
    }
)(NewsSearchContainer)