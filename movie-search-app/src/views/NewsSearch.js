import React, { useState, useEffect } from "react";
import '../scss/newsSearch.scss'

export default ({fetchNewsItems})=>{

    const [query, setQuery]=useState('');

    const onChange=(e)=>{
        setQuery(e.target.value);
    }

    const onSubmitResult=()=>{
        if(!query){
            alert("검색어를 입력해주세요"); return;
        }

        fetchNewsItems(query);

        setQuery('');
    }

    return(
        <div className="nav-body">
            <span className="nav-title">NYPost article search</span>
            <input 
            className="nav-body-input" 
            onChange={onChange}
            value={query}
            placeholder="검색어 입력"
            ></input>
            <button onClick={onSubmitResult}>검색</button>
        </div>
    )
}