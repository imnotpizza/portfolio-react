import React, { useState, useEffect } from "react";
import Description from './Description'
import '../scss/newsSearch.scss'
import {Button} from 'react-bootstrap';
export default ({fetchNewsItems})=>{

    const [query, setQuery]=useState('');
    const [modalShow, setModalShow] = React.useState(false);

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
        <div id="app-body">
            <span className="nav-title">The NYTimes Article Search App</span>
            <input 
            className="nav-body-input" 
            onChange={onChange}
            value={query}
            placeholder="검색어 입력"
            ></input>
            <button
            onClick={onSubmitResult}
            className="nav-body-button"
            >검색
            </button>
            <span className="nav-modal">
                <Button variant="link" onClick={()=>{setModalShow(true)}}>프로젝트 설명</Button>
            </span>
            <Description isOpen={modalShow} closeModal={()=>{setModalShow(false)}}></Description>
        </div>
    )
}