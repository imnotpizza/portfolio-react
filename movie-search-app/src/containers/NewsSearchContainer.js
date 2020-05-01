import React from 'react';
import {connect} from 'react-redux';
import {getNewsList, setQuery} from '../redux/news';
import NewsSearch from '../views/NewsSearch';

const mapStateToProps=state=>({
    query: state.news.query,
})

const NewsSearchContainer=({
    query,
    setQuery,
    fetchNewsItems,
    isLoading,
})=>{
    return(
        <NewsSearch
        query={query}
        setQuery={setQuery}
        fetchNewsItems={fetchNewsItems}
        isLoading={isLoading}
        ></NewsSearch>
    )
}

export default connect(
    mapStateToProps,
    {
        setQuery
    }
)(NewsSearchContainer)