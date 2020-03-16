import React, { useState, useEffect, useRef } from "react";
import { tempItems } from "../constants";
import MovieItem from './MovieItem';
import MovieDetail from './MovieDetail';
import NoResults from './NoResults';
import {Grid, Row, Col} from 'reactstrap';


const MovieList=({items})=>{
    //const [items, setItems]=useState(tempItems);//state 로 적용해야 함
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
          return(
            <NoResults></NoResults>
          )
        }else{

          
          return items.map((item, id)=>{
            return(
              
              <Col sm={6} md={4} key={id}>
                    <MovieItem
                    movieItem={item}
                    ></MovieItem>
                </Col>
               
               )
              })
          }
        
    }
      
      return(
          <div>
              <Row className="show-grid" >
                {getItemList()}
              </Row>
            
          </div>
      )
}

export default MovieList;