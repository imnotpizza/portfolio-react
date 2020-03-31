import React from 'react';
import '../App.css'
import '../scss/style.scss'

const NoResults=()=>{

    return(
      <div className="box1">
        <div className="box2">
        <h1 className="noresult-text">결과가 없습니다</h1>
        <h6 className="noresult-text-small">다른 검색어를 입력해보세요!</h6>
      </div>  
      </div>
    )
}

export default NoResults;