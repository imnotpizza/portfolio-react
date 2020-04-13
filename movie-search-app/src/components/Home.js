import React, {useState, useCallback, useEffect} from 'react';
import MovieList from './MovieList';
import MovieSearch from './MovieSearch';
import Welcome from './Welcome';
import { fetch_movielist } from '../apis/list';
import Rating from "@material-ui/lab/Rating";
import CircularProgress from '@material-ui/core/CircularProgress';
import {Navbar, Nav, Form, InputGroup, FormControl, Button} from 'react-bootstrap';
import  {Modal, ModalBody} from 'reactstrap';
import { DESCRIPTION } from '../constants';
import '../scss/style.scss';



const Home=()=>{
    const [listActivated, setListActivated]=useState(true);//welcome문구 표시 플래그
    const [isLoading, setIsLoading]=useState(false);//로딩중 여부 플래그
    const [query, setQuery] = useState("");
    const [movieItems, setMovieItems]=useState([]);
  
      const onChange = useCallback(e => {
            setQuery(e.target.value);
          },[query]
        );
  
      //api 통해 데이터 가져온 뒤 state 에 저장
      const onClickSearchBtn = useCallback(async ()=> {
        
        try{
            setIsLoading(true);
            setListActivated(true);

            if(!query){ alert("검색어를 입력해주세요"); return; }
  
            const response = await fetch_movielist(query); //객체 넣어야 함
    
            setMovieItems(response.data);

        }catch(e){
           
        }finally{
          setIsLoading(false);
        }
          
      });
  
    return (
      <>
      <div className="nav-body">
        <span className="nav-title">My Love Movie</span>
        <Description></Description>
        <span>

          <input
          className="nav-input"
          type="text"
          placeholder="찾을 영화 제목을 검색하세요"  
          onChange={onChange}
          ></input>

              
        </span>
        <span className="nav-text">
          <Button onClick={onClickSearchBtn}>검색하기</Button>
        </span>
      
      </div>
      
      <div>
      {
        (!listActivated ? 
          
          <Welcome></Welcome>
          :
          (isLoading ?
            <Loading></Loading>
            :
            <div className="list">
              <MovieList
              items={movieItems}
              ></MovieList>
            </div>
          )

        )
      }
      </div>


    
      
      </>
    )
}


//로딩 컴포넌트
const Loading=()=>{
  return(
    <div className="box1">
        <div className="box2">
          불러오는 중...
        </div>
    </div>


  )
}


//간단설명
const Description=()=>{
  const [isOpen, setIsOpen]=useState(false);

  const openModal=()=>{
    setIsOpen(true);
  }



 return(
    <>
        <span className="nav-text" onClick={openModal}>프로젝트 설명</span>
          <Modal isOpen={isOpen} size="lg">
            <div className="desc-body">

              <p className="desc-title">프로젝트 간단설명</p>
           
              <div className="desc-text">
                {DESCRIPTION[0]}
              </div>
              <div className="desc-text">
                {DESCRIPTION[1]}
              </div>
              <br></br>
              <div className="desc-text">
                {DESCRIPTION[2]}
              </div>
              <div className="desc-text">
                {DESCRIPTION[3]}
              </div>
              <div className="desc-text">
                {DESCRIPTION[4]}
              </div>
              <div align="right">
                <Button onClick={()=>setIsOpen(false)}>확인</Button>
              </div>
         
            </div>
          </Modal>
    </>
    )
}


export default Home;
