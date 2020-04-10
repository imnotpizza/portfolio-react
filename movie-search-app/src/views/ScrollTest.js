import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';

export default ()=>{
    const list=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  return(
    <div>

    <InfiniteScroll
    pageStart={1}
    loadMore={()=>{alert('loadmore')}}
    hasMore={true}
    initialLoad={false}
    loader={<div className="loader" key={0}>Loading ...</div>}
    >
   
    </InfiniteScroll>
    
    </div>
  )
}