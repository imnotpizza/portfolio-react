import React from 'react';
import '../App.css'

const NoResults=()=>{

    return(
      <div className="no-results">
        <h1 className="no-results-text">결과가 없습니다</h1>
        <h6 className="no-results-text-small">다른 검색어를 입력해보세요!</h6>
      </div>  
    )
}

export default NoResults;