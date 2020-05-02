import React, { useState, useEffect, useRef } from "react";
import Description from './Description'
import '../sass/NewsSearch.scss'
import { Button } from 'react-bootstrap';



export default ({ fetchNewsItems, isLoading, query, setQuery, scrapItems }) => {

    //const [query, setQuery] = useState('');
    const [modalShow, setModalShow] = React.useState(false);
    const focusInput = useRef();

    const onChange = (e) => {
        setQuery(e.target.value)//상태 관리
    }

    const onSubmitResult = () => {
   
        
        const isEng = /^[a-zA-Z0-9\s]*$/;

        if (!query) {
            alert("검색어를 입력해주세요");
            focusInput.current.focus();
            return;
        } else if (!isEng.test(query)) {
            alert('영어 단어만 입력해주세요');
            focusInput.current.focus();
            return;
        }
        fetchNewsItems(query, scrapItems);


    }

    return (
        <div id="nav-container">
            <div id="nav-title">
                <span>The NYTimes Article Search App</span>
            </div>

            <div id="nav-search">
                <input
                    id="nav-input"
                    onChange={onChange}
                    value={query}
                    placeholder="검색어 입력 (영어만 입력해주세요)"
                    ref={focusInput}
                ></input>
                <button
                    onClick={onSubmitResult}
                    id={isLoading ? "nav-input-button-loading" : "nav-input-button"}
                    disabled={isLoading}
                >
                  
                    {isLoading ? '검색 중...' : '검색'}
                </button>
            </div>

            <div id="nav-modal-title">
             
                    <Button variant="link" onClick={() => { setModalShow(true) }}>프로젝트 설명</Button>
              
            </div>


            <Description isOpen={modalShow} closeModal={() => { setModalShow(false) }}></Description>
        </div>
    )
}