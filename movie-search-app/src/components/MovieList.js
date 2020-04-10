import React, { useState, useEffect, useRef } from "react";
import MovieItem from './MovieItem';
import MovieDetail from './MovieDetail';
import NoResults from './NoResults';
import {tempItems} from '../constants'
import {Grid, Row, Col} from 'reactstrap';
import '../scss/style.scss';


/**
 * 
 * movie 리스트 뷰
 * home에서 호출한 리스트 전달받아 표시
 * 
 * 추가
 * -리스트 id추가
 * -id로 판단
 *  
 */
const MovieList=()=>{
    const [items, setItems] = useState(tempItems);
    const [visible, setVisible] = useState(false);

    const openModal = (e) => {
        e.preventDefault();
        setVisible(true); 
      };
  
    const clsoeModal = () => {
        setVisible(false);
    };
    
   

    //아이템리스트 반환
    const getItemList=()=>{

        if(items.length===0){
          return <NoResults></NoResults>
           
        }else{

          return items.map((item, id)=>{
            return(
              
                <Col sm={6} md={4} key={id}>
                    <MovieItem
                    movieItem={item}
                    id={id}
                    ></MovieItem>
                </Col>
               
                )
              })
          }
        
    }


      
      return(
          <div>
              <Row>
                {getItemList()}
              </Row>
            
          </div>
      )
}


 

export default MovieList;